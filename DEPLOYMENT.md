# Deploying XERT API Server for ChatGPT

## Option 1: Railway (Recommended - Easiest)

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub repository: `gally74/xert-chatgpt`
4. Add environment variables:
   - `XERT_ACCESS_TOKEN` - Your XERT access token
   - `XERT_REFRESH_TOKEN` - Your XERT refresh token
5. Railway will auto-detect Node.js and deploy
6. Set the start command: `node dist/apiServer.js`
7. Get your public URL from Railway dashboard
8. Update `chatgpt-openapi-schema.json` with this URL

## Option 2: Render

1. Sign up at [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository: `gally74/xert-chatgpt`
4. Configure:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node dist/apiServer.js`
5. Add environment variables:
   - `XERT_ACCESS_TOKEN`
   - `XERT_REFRESH_TOKEN`
6. Deploy and get your public URL

## Option 3: Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set XERT_ACCESS_TOKEN=your_token
   heroku config:set XERT_REFRESH_TOKEN=your_refresh_token
   ```
5. Add buildpacks:
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```
6. Deploy: `git push heroku main`
7. Get URL: `heroku info`

## Getting Your Tokens

Before deploying, get your XERT tokens:

```bash
npm run setup-auth
```

Then copy the values from `.env`:
- `XERT_ACCESS_TOKEN=...`
- `XERT_REFRESH_TOKEN=...`

**Important:** Never commit your `.env` file to git!

## Updating Your Custom GPT

After deployment:
1. Get your public URL (e.g., `https://your-app.railway.app`)
2. Open `chatgpt-openapi-schema.json`
3. Replace `YOUR_SERVER_URL_HERE` with your deployed URL
4. Update your Custom GPT with the new schema

## Environment Variables

All hosting platforms require these environment variables:

- `XERT_ACCESS_TOKEN` - Your XERT OAuth access token
- `XERT_REFRESH_TOKEN` - Your XERT OAuth refresh token

Optional:
- `PORT` - Server port (defaults to 3000)

## Token Refresh

Tokens expire after 7 days. For production:
1. Set up a scheduled job to refresh tokens
2. Or manually update environment variables when tokens expire
3. Run `npm run setup-auth` locally to get new tokens
