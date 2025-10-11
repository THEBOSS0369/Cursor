# MindsDB Integration Setup

This project integrates with MindsDB agents running on Docker. Follow these steps to configure the connection.

## Prerequisites

1. MindsDB running on Docker with the following agents:
   - `medical_assistant` - Global medical data assistant
   - `org001_assistant` - City Hospital (ORG001) assistant
   - `org002_assistant` - Metropolitan Medical Center (ORG002) assistant

## Configuration

### Step 1: Create Environment File

Create a `.env.local` file in the project root with the following content:

```env
# MindsDB HTTP API Configuration
NEXT_PUBLIC_MINDSDB_API=http://localhost:47334/api/sql/query
```

### Step 2: Update Connection Settings

Update the values in `.env.local` to match your MindsDB Docker configuration:

- **NEXT_PUBLIC_MINDSDB_API**: The MindsDB HTTP API endpoint (default: `http://localhost:47334/api/sql/query`)
  - Change `localhost` to your MindsDB host if running remotely
  - Change `47334` if your MindsDB HTTP API port is different

### Step 3: Verify MindsDB Connection

To verify your MindsDB Docker instance is running and accessible:

```bash
# Check if MindsDB container is running
docker ps | grep mindsdb

# Test the HTTP API with curl
curl -X POST http://localhost:47334/api/sql/query \
  -H "Content-Type: application/json" \
  -d '{"query": "SHOW AGENTS;"}'
```

### Step 4: Start the Development Server

```bash
npm run dev
```

### Step 5: Access the Agents Page

Navigate to `http://localhost:3000/agents` to interact with your MindsDB agents.

## Available Agents

### 1. Medical Assistant (Global)

- **Agent ID**: `medical_assistant`
- **Access Level**: All organizations
- **Capabilities**:
  - System-wide medical data analysis
  - Cross-organization comparisons
  - Global statistics and trends

### 2. City Hospital Assistant (ORG001)

- **Agent ID**: `org001_assistant`
- **Access Level**: ORG001 only
- **Capabilities**:
  - Hospital-specific appointment data
  - Doctor workload analysis
  - Patient demographics for ORG001

### 3. Metropolitan Medical Center Assistant (ORG002)

- **Agent ID**: `org002_assistant`
- **Access Level**: ORG002 only
- **Capabilities**:
  - Medical center-specific data
  - Condition analysis for ORG002
  - Staff and patient insights

## Example Queries

### Medical Assistant (Global)

- "What are the top 5 most common medical conditions?"
- "Compare appointment volumes across all organizations"
- "What is the age distribution across all patients?"

### City Hospital Assistant (ORG001)

- "How many total appointments do we have?"
- "What are the most common conditions at our hospital?"
- "Which doctors have the most appointments?"

### Metropolitan Medical Center Assistant (ORG002)

- "What is the patient age distribution at our center?"
- "List our doctors and their specialties"
- "How many severe cases do we have?"

## Troubleshooting

### Connection Issues

If you can't connect to MindsDB:

1. **Check if MindsDB is running**:

   ```bash
   docker ps | grep mindsdb
   ```

2. **Verify port mapping**:
   Ensure your Docker container maps port 47334 (HTTP API):

   ```bash
   docker run -d -p 47334:47334 mindsdb/mindsdb
   ```

3. **Check firewall settings**:
   Ensure localhost connections are allowed on port 47334

4. **Test the API endpoint**:

   ```bash
   curl -X POST http://localhost:47334/api/sql/query \
     -H "Content-Type: application/json" \
     -d '{"query": "SELECT answer FROM medical_assistant WHERE question = '\''How many appointments are there?'\'';"}'
   ```

### Agent Query Issues

If agents don't respond:

1. **Verify agents exist in MindsDB**:

   ```sql
   SHOW AGENTS;
   ```

2. **Check agent data tables**:

   ```sql
   SELECT * FROM files.enriched_doctors LIMIT 5;
   SELECT * FROM files.org001_enriched_appointments LIMIT 5;
   ```

3. **Test agent directly in MindsDB**:
   ```sql
   SELECT answer FROM medical_assistant
   WHERE question = 'How many appointments are there?';
   ```

## API Endpoint

The integration uses a Next.js API route at `/api/mindsdb` that:

- Accepts POST requests with `agent` and `question` parameters
- Connects to MindsDB via HTTP API
- Sends SQL queries to MindsDB
- Returns the agent's response in format: `{ agent, question, answer }`

### Example API Request

```javascript
// Frontend request to Next.js API
fetch("/api/mindsdb", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agent: "medical_assistant",
    question: "What are the most common conditions?",
  }),
});
```

### Example Direct MindsDB API Request

```bash
# Direct request to MindsDB HTTP API
curl -X POST http://localhost:47334/api/sql/query \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT answer FROM medical_assistant WHERE question = '\''What are the most common conditions?'\'';"}'
```

### MindsDB Response Format

MindsDB returns data in the following format:

```json
{
  "type": "table",
  "data": [["The answer text here"]],
  "column_names": ["answer"],
  "context": { "show_secrets": false, "db": "mindsdb" }
}
```

The answer is accessed via `data[0][0]`.

## Security Notes

- Each organization-specific agent (ORG001, ORG002) has data isolation
- Agents have read-only access to their respective data
- No cross-organization data leakage
- All queries are logged for audit purposes

## Support

For issues or questions:

1. Check MindsDB logs: `docker logs <container_id>`
2. Verify database connection settings
3. Ensure all required tables are created in MindsDB
4. Review the API error messages in browser console
