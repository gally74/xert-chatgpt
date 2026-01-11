# Setting Up XERT MCP Server with Claude Desktop

## Step-by-Step Guide

### Step 1: Install Claude Desktop
1. Go to https://claude.ai/download
2. Download Claude Desktop for macOS
3. Install and open Claude Desktop

### Step 2: Find or Create the Config File
1. Open Finder
2. Press `Cmd + Shift + G` (Go to Folder)
3. Type: `~/Library/Application Support/Claude`
4. Press Enter

### Step 3: Create or Edit the Config File
1. Look for a file called `claude_desktop_config.json`
2. If it doesn't exist, create a new file with that exact name
3. Open it in a text editor (TextEdit works fine)

### Step 4: Add the XERT Server Configuration
Copy and paste this into the file (replace with your actual path if different):

```json
{
  "mcpServers": {
    "xert": {
      "command": "node",
      "args": [
        "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert/dist/server.js"
      ],
      "env": {
        "XERT_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN_HERE",
        "XERT_REFRESH_TOKEN": "YOUR_REFRESH_TOKEN_HERE"
      }
    }
  }
}
```

**Important:** Replace `YOUR_ACCESS_TOKEN_HERE` and `YOUR_REFRESH_TOKEN_HERE` with your actual tokens from the `.env` file.

### Step 5: Get Your Tokens
1. Open Terminal
2. Run:
   ```bash
   cd "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert"
   cat .env
   ```
3. Copy the values after `XERT_ACCESS_TOKEN=` and `XERT_REFRESH_TOKEN=`
4. Paste them into the config file (remove any quotes if present)

### Step 6: Save and Restart
1. Save the config file
2. Quit Claude Desktop completely (Cmd+Q)
3. Reopen Claude Desktop

### Step 7: Test It
Ask Claude:
- "What's my current FTP?"
- "Show me my workout of the day"
- "List my activities from the last week"

## Troubleshooting

**If it doesn't work:**
- Make sure the path to `dist/server.js` is correct
- Check that the tokens are correct (no extra spaces)
- Make sure you saved the config file as `claude_desktop_config.json` (exact name)
- Restart Claude Desktop after making changes

## Token Refresh

Tokens expire after 7 days. When they do:
1. Run: `cd "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert" && npm run setup-auth`
2. Enter your XERT credentials
3. Update the tokens in the config file
4. Restart Claude Desktop
