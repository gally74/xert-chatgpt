# Quick Start: XERT + ChatGPT

## 🚀 Fast Setup (5 minutes)

### 1. Start the API Server

```bash
cd "/Users/roy/Library/CloudStorage/OneDrive-IR/Cursor Projects/Xert"
npm run api
```

Keep this terminal open! The server runs on `http://localhost:3000`

### 2. Make it Accessible (Choose One)

**Option A: ngrok (Easiest)**
1. Download ngrok: https://ngrok.com/download
2. In a NEW terminal:
   ```bash
   ngrok http 3000
   ```
3. Copy the HTTPS URL (looks like `https://abc123.ngrok.io`)

**Option B: Deploy Online**
- Deploy to Heroku, Railway, Render, etc.
- Use that URL instead

### 3. Create Custom GPT

1. Go to https://chat.openai.com
2. Click your name → "Create a GPT"
3. Click "Configure"
4. **Name:** XERT Training
5. **Instructions:** 
   ```
   You are a cycling training assistant. Use the API to get real XERT data when users ask about their training.
   ```
6. Scroll to "Actions" → "Create new action"
7. Paste the OpenAPI schema from `CHATGPT_SETUP.md` (Step 5)
8. Replace `YOUR_SERVER_URL_HERE` with your ngrok URL
9. Save

### 4. Test It!

Ask your Custom GPT:
- "What's my FTP?"
- "Show me my workout of the day"
- "List my activities from this week"

## 📝 Full Instructions

See `CHATGPT_SETUP.md` for detailed steps and troubleshooting.

## ⚠️ Important

- Keep the API server running while using ChatGPT
- Tokens expire in 7 days - run `npm run setup-auth` to refresh
- For production, deploy the server online instead of using ngrok
