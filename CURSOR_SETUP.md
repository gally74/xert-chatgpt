# Cursor MCP Setup Guide

## ✅ Setup Complete!

Your XERT MCP server has been:
- ✅ Dependencies installed
- ✅ Authenticated with XERT (tokens saved)
- ✅ Built and ready to use

## 📍 Server Location

Your built server is at:
```
/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert/dist/server.js
```

## 🔧 Configuring Cursor

Cursor may handle MCP servers differently than Claude Desktop. Here are the steps to configure it:

### Option 1: Cursor Settings UI
1. Open Cursor
2. Press `Cmd+,` to open Settings
3. Search for "MCP" or "Model Context Protocol"
4. If you see MCP server settings, add:
   - **Name**: `xert`
   - **Command**: `node`
   - **Args**: `/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert/dist/server.js`

### Option 2: Configuration File
If Cursor uses a config file (similar to Claude Desktop), it might be at:
- `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
- Or check Cursor's documentation for MCP configuration

### Option 3: Workspace Settings
You can also try adding MCP configuration to workspace settings.

## 🧪 Testing

Once configured, you can test by asking Cursor:
- "What's my current FTP?"
- "Show me my workout of the day"
- "List my activities from the last week"

## 🔄 Token Refresh

Your tokens are valid for 7 days. If they expire, run:
```bash
cd "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert"
npm run setup-auth
```

## 📝 Note

If Cursor doesn't support MCP servers yet, you can still use this server with:
- Claude Desktop (see README.md for setup)
- Any other MCP-compatible client
