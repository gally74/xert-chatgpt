# Setting Up XERT with ChatGPT

This guide will help you connect your XERT training data to ChatGPT using a Custom GPT.

## Prerequisites

- ✅ XERT API server ready to use
- ✅ Node.js installed
- ✅ ChatGPT Plus subscription (required for Custom GPTs)

## Step 1: Install Dependencies

The API server needs Express. Install it:

```bash
cd "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert"
npm install
```

## Step 2: Start the API Server

You have two options:

### Option A: Development Mode (for testing)
```bash
npm run api
```

The server will start on `http://localhost:3000`

### Option B: Production Mode
```bash
npm run build
node dist/apiServer.js
```

**Important:** Keep this server running while using ChatGPT!

## Step 3: Make Server Accessible

ChatGPT needs to access your server. You have two options:

### Option A: Use ngrok (Recommended for Testing)

1. Install ngrok: https://ngrok.com/download
2. In a new terminal, run:
   ```bash
   ngrok http 3000
   ```
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. Use this URL in Step 4

### Option B: Deploy to a Cloud Service

Deploy the API server to:
- Heroku
- Railway
- Render
- AWS
- Or any Node.js hosting service

## Step 4: Create Custom GPT in ChatGPT

1. Go to https://chat.openai.com
2. Click your profile → "Customize ChatGPT" → "Create a GPT"
3. Click "Configure" tab
4. Fill in:

**Name:** XERT Training Assistant

**Description:** 
```
A personal cycling training assistant that accesses your XERT fitness data including FTP, training load, workouts, and activities.
```

**Instructions:**
```
You are a helpful cycling training assistant that accesses XERT training data through API calls.

When users ask about their training, use the API endpoints to fetch real data:
- Use GET /api/training-info for FTP, training status, and workout of the day
- Use GET /api/workouts to list workouts
- Use GET /api/workouts/{id} for workout details
- Use GET /api/activities?from={timestamp}&to={timestamp} for activities
- Use GET /api/activities/{id} for activity details

Always provide helpful, encouraging responses about training data.
```

## Step 5: Add API Actions

1. In the Custom GPT editor, scroll to "Actions"
2. Click "Create new action"
3. Add the following schema:

```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "XERT Training API",
    "description": "Access your XERT cycling training data",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "YOUR_SERVER_URL_HERE"
    }
  ],
  "paths": {
    "/api/training-info": {
      "get": {
        "summary": "Get training info including FTP, training load, and workout of the day",
        "operationId": "getTrainingInfo",
        "responses": {
          "200": {
            "description": "Training information",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          }
        }
      }
    },
    "/api/workouts": {
      "get": {
        "summary": "List all saved workouts",
        "operationId": "listWorkouts",
        "responses": {
          "200": {
            "description": "List of workouts",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {"type": "boolean"},
                    "workouts": {"type": "array"}
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/workouts/{workoutId}": {
      "get": {
        "summary": "Get detailed workout information",
        "operationId": "getWorkout",
        "parameters": [
          {
            "name": "workoutId",
            "in": "path",
            "required": true,
            "schema": {"type": "string"}
          }
        ],
        "responses": {
          "200": {
            "description": "Workout details",
            "content": {
              "application/json": {
                "schema": {"type": "object"}
              }
            }
          }
        }
      }
    },
    "/api/activities": {
      "get": {
        "summary": "List activities in a date range",
        "operationId": "listActivities",
        "parameters": [
          {
            "name": "from",
            "in": "query",
            "schema": {"type": "integer"},
            "description": "Unix timestamp for start date"
          },
          {
            "name": "to",
            "in": "query",
            "schema": {"type": "integer"},
            "description": "Unix timestamp for end date"
          }
        ],
        "responses": {
          "200": {
            "description": "List of activities",
            "content": {
              "application/json": {
                "schema": {"type": "object"}
              }
            }
          }
        }
      }
    },
    "/api/activities/{activityId}": {
      "get": {
        "summary": "Get detailed activity information",
        "operationId": "getActivity",
        "parameters": [
          {
            "name": "activityId",
            "in": "path",
            "required": true,
            "schema": {"type": "string"}
          },
          {
            "name": "session_data",
            "in": "query",
            "schema": {"type": "boolean"},
            "description": "Include per-second session data"
          }
        ],
        "responses": {
          "200": {
            "description": "Activity details",
            "content": {
              "application/json": {
                "schema": {"type": "object"}
              }
            }
          }
        }
      }
    }
  }
}
```

4. Replace `YOUR_SERVER_URL_HERE` with your ngrok URL or deployed server URL
5. Save the Custom GPT

## Step 6: Test It!

1. Start a conversation with your Custom GPT
2. Ask: "What's my current FTP?"
3. Ask: "Show me my workout of the day"
4. Ask: "List my activities from the last week"

## Troubleshooting

**Server not accessible:**
- Make sure the API server is running
- Check that ngrok is running (if using ngrok)
- Verify the URL in the Custom GPT configuration

**Authentication errors:**
- Tokens expire after 7 days
- Run `npm run setup-auth` to refresh tokens
- Restart the API server

**API not working:**
- Check server logs for errors
- Test endpoints directly: `curl http://localhost:3000/api/training-info`
- Make sure `.env` file has valid tokens

## Security Note

⚠️ **Important:** When using ngrok or exposing your server:
- Your XERT tokens are on the server
- Only share the Custom GPT with people you trust
- Consider using authentication for production use

## Next Steps

- Deploy to a permanent hosting service
- Add authentication/API keys
- Set up automatic token refresh
- Add more endpoints as needed
