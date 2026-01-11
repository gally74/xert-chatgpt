#!/usr/bin/env tsx
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const envPath = path.join(projectRoot, '.env');

const XERT_TOKEN_URL = 'https://www.xertonline.com/oauth/token';
const XERT_PUBLIC_CLIENT = { username: 'xert_public', password: 'xert_public' };

async function authenticate() {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', 'Roy');
  params.append('password', 'j9Um2dfCF5LzS@5');

  const response = await axios.post(XERT_TOKEN_URL, params.toString(), {
    auth: XERT_PUBLIC_CLIENT,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }

  if (envContent.includes('XERT_ACCESS_TOKEN=')) {
    envContent = envContent.replace(/XERT_ACCESS_TOKEN=.*/g, `XERT_ACCESS_TOKEN=${response.data.access_token}`);
  } else {
    envContent += `\nXERT_ACCESS_TOKEN=${response.data.access_token}`;
  }

  if (envContent.includes('XERT_REFRESH_TOKEN=')) {
    envContent = envContent.replace(/XERT_REFRESH_TOKEN=.*/g, `XERT_REFRESH_TOKEN=${response.data.refresh_token}`);
  } else {
    envContent += `\nXERT_REFRESH_TOKEN=${response.data.refresh_token}`;
  }

  envContent = envContent.replace(/\n{3,}/g, '\n\n').trim() + '\n';
  fs.writeFileSync(envPath, envContent);

  console.log('✅ Authentication successful!');
  console.log(`✅ Tokens saved to: ${envPath}`);
}

authenticate().catch(console.error);
