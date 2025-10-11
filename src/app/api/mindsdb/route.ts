import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { agent, question } = await request.json();

    if (!agent || !question) {
      return NextResponse.json(
        { error: "Agent and question are required" },
        { status: 400 }
      );
    }

    // Validate agent name
    const validAgents = [
      "medical_assistant",
      "org001_assistant",
      "org002_assistant",
    ];
    if (!validAgents.includes(agent)) {
      return NextResponse.json(
        { error: "Invalid agent name" },
        { status: 400 }
      );
    }

    // Get MindsDB API URL from environment
    const mindsdbApiUrl =
      process.env.NEXT_PUBLIC_MINDSDB_API ||
      "http://localhost:47334/api/sql/query";

    // Escape single quotes in the question to prevent SQL injection
    const escapedQuestion = question.replace(/'/g, "''");

    // Create SQL query
    const sqlQuery = `SELECT answer FROM ${agent} WHERE question = '${escapedQuestion}';`;

    // Send query to MindsDB HTTP API
    const response = await fetch(mindsdbApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: sqlQuery,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: "MindsDB API request failed",
          details: errorData.error || response.statusText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // MindsDB returns data in format: {"type": "table", "data": [["answer"]], "column_names": ["answer"]}
    let answer = null;

    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      // The answer is in data[0][0] for MindsDB's table format
      answer = data.data[0][0];
    }

    if (!answer) {
      return NextResponse.json(
        { error: "No response from agent" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      agent,
      question,
      answer,
    });
  } catch (error) {
    console.error("MindsDB API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to query MindsDB agent",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
