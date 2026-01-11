# XERT Training Assistant for ChatGPT

Connect your XERT cycling training data to ChatGPT using a Custom GPT. Get real-time access to your FTP, training load, workouts, and activities through natural language conversations.

## 🚀 Features

- 📊 **Fitness Signature** - Get your current FTP, LTP, HIE, and Peak Power
- 🎯 **Training Status** - Check freshness, training load, and recommended XSS
- 🏋️ **Workout of the Day** - AI-powered workout recommendations
- 📋 **Workouts** - List, view details, and export workouts
- 🚴 **Activities** - Browse activities with full XSS metrics and MPA data

## 📋 Prerequisites

- Node.js 18 or later
- A XERT account (free or premium)
- ChatGPT Plus subscription (required for Custom GPTs)

## 🛠️ Quick Setup

### 1. Clone and Install

```bash
git clone https://github.com/gally74/xert-chatgpt.git
cd xert-chatgpt
npm install
```

### 2. Authenticate with XERT

```bash
npm run setup-auth
```

Enter your XERT email and password when prompted. Your tokens will be saved to `.env` (this file is not committed to git).

### 3. Start the API Server

```bash
npm run api
```

The server will run on `http://localhost:3000`

### 4. Make it Accessible

**Option A: Using ngrok (for testing)**
```bash
# Install ngrok from https://ngrok.com/download
ngrok http 3000
```

Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)

**Option B: Deploy Online (recommended for production)**
- Deploy to [Railway](https://railway.app), [Render](https://render.com), [Heroku](https://heroku.com), or any Node.js hosting
- See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions

### 5. Create Custom GPT in ChatGPT

1. Go to https://chat.openai.com → Create a GPT
2. Click "Configure" tab
3. Copy the configuration from `COPY_PASTE_GPT_CONFIG.txt`
4. Add the OpenAPI schema from `chatgpt-openapi-schema.json` (update the server URL)
5. Save your Custom GPT

See [CHATGPT_SETUP.md](CHATGPT_SETUP.md) for detailed instructions.

## 📖 Documentation

- **[QUICK_START_CHATGPT.md](QUICK_START_CHATGPT.md)** - Fast setup guide
- **[CHATGPT_SETUP.md](CHATGPT_SETUP.md)** - Complete setup instructions
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to cloud hosting
- **[COPY_PASTE_GPT_CONFIG.txt](COPY_PASTE_GPT_CONFIG.txt)** - Ready-to-use GPT configuration

## 🔧 Available Scripts

```bash
npm run setup-auth    # Authenticate with XERT
npm run api          # Start API server (development)
npm run build        # Build for production
npm run api:build    # Build and start API server
```

## 🔐 Security

- Your XERT credentials are stored locally in `.env` (never committed)
- Tokens expire after 7 days - run `npm run setup-auth` to refresh
- For production deployments, use environment variables on your hosting platform

## 📝 Example Questions

Once set up, ask your Custom GPT:
- "What's my current FTP?"
- "Am I fresh or fatigued?"
- "Show me my workout of the day"
- "List my activities from the last week"
- "What was my XSS for yesterday's ride?"

## 🆘 Troubleshooting

**Server not accessible:**
- Make sure the API server is running (`npm run api`)
- Check that ngrok is running (if using ngrok)
- Verify the URL in your Custom GPT configuration

**Authentication errors:**
- Tokens expire after 7 days
- Run `npm run setup-auth` to refresh tokens
- Restart the API server after updating tokens

## 📄 License

MIT

## 🙏 Credits

- [XERT](https://www.xertonline.com/) - Advanced cycling analytics
- [XERT](https://www.xertonline.com/) - Advanced cycling analytics platform
