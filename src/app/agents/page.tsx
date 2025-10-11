"use client";

import { useState } from "react";

type Agent = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};

const agents: Agent[] = [
  {
    id: "medical_assistant",
    name: "Medical Assistant",
    description:
      "Access all medical data across all organizations. Analyze appointment trends, patient demographics, and medical conditions system-wide.",
    icon: "🏥",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "org001_assistant",
    name: "City Hospital (ORG001)",
    description:
      "Specialized assistant for City Hospital. Access appointment data, doctor information, and patient insights for ORG001 only.",
    icon: "🏛️",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "org002_assistant",
    name: "Metropolitan Medical Center (ORG002)",
    description:
      "Dedicated assistant for Metropolitan Medical Center. Query ORG002-specific data including appointments, conditions, and statistics.",
    icon: "🏢",
    color: "from-green-500 to-emerald-500",
  },
];

type Message = {
  role: "user" | "agent";
  content: string;
  timestamp: Date;
};

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedAgent || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/mindsdb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent: selectedAgent.id,
          question: input,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const agentMessage: Message = {
          role: "agent",
          content: data.answer,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, agentMessage]);
      } else {
        const errorMessage: Message = {
          role: "agent",
          content: `Error: ${data.error}${
            data.details ? ` - ${data.details}` : ""
          }`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: "agent",
        content: `Failed to communicate with the agent: ${
          (error as Error).message
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAgentSelect = (agent: Agent) => {
    setSelectedAgent(agent);
    setMessages([]);
    setInput("");
  };

  const exampleQuestions = selectedAgent
    ? {
        medical_assistant: [
          "What are the top 5 most common medical conditions?",
          "Compare appointment volumes across all organizations",
          "What is the age distribution across all patients?",
        ],
        org001_assistant: [
          "How many total appointments do we have?",
          "What are the most common conditions at our hospital?",
          "Which doctors have the most appointments?",
        ],
        org002_assistant: [
          "What is the patient age distribution at our center?",
          "List our doctors and their specialties",
          "How many severe cases do we have?",
        ],
      }[selectedAgent.id]
    : [];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Gradient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MindsDB Agents
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Interact with your intelligent medical data agents powered by
              MindsDB
            </p>
          </div>

          {!selectedAgent ? (
            /* Agent Selection Grid */
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSelect(agent)}
                  className="group p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-left"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}
                  >
                    {agent.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-purple-400 group-hover:text-purple-300">
                    <span>Start chatting</span>
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Chat Interface */
            <div className="space-y-6">
              {/* Selected Agent Header */}
              <div className="flex items-center justify-between p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedAgent.color} flex items-center justify-center text-2xl`}
                  >
                    {selectedAgent.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedAgent.name}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {selectedAgent.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                >
                  Change Agent
                </button>
              </div>

              {/* Example Questions */}
              {messages.length === 0 && (
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-sm font-semibold mb-3 text-gray-300">
                    Try asking:
                  </h3>
                  <div className="space-y-2">
                    {exampleQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(question)}
                        className="block w-full text-left px-4 py-3 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto p-6 rounded-xl bg-white/5 border border-white/10">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 mx-auto mb-4 opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <p>No messages yet. Start by asking a question!</p>
                    </div>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-xl ${
                          message.role === "user"
                            ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                            : "bg-white/10 text-gray-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className="text-xs opacity-60 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-4 rounded-xl bg-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                >
                  {isLoading ? (
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Isolated</h3>
              <p className="text-gray-400 text-sm">
                Each organization's data is completely isolated with read-only
                access
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">
                Powered by MindsDB's advanced AI models for intelligent insights
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Real-time Analytics
              </h3>
              <p className="text-gray-400 text-sm">
                Get instant insights from your medical data with natural
                language
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
