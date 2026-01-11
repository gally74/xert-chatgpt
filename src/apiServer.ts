/**
 * XERT REST API Server for ChatGPT
 * 
 * Provides REST API endpoints that ChatGPT Custom GPTs can use
 * to access XERT training data.
 */

import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

// CRITICAL: Load .env BEFORE importing xertClient
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const envPath = path.resolve(projectRoot, '.env');

// Load environment variables FIRST
dotenv.config({ path: envPath });

// Now import xertClient (which will use the loaded env vars)
import {
  getTrainingInfo,
  listWorkouts,
  getWorkout,
  downloadWorkout,
  listActivities,
  getActivity,
  uploadFitFile,
} from './xertClient.js';
import { formatTrainingInfo } from './formatters.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for ChatGPT
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'xert-api' });
});

// Get training info
app.get('/api/training-info', async (req: Request, res: Response) => {
  try {
    const format = req.query.format as 'zwo' | 'erg' | undefined;
    const data = await getTrainingInfo(format);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch training info',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// List workouts
app.get('/api/workouts', async (req: Request, res: Response) => {
  try {
    const workouts = await listWorkouts();
    res.json({ success: true, workouts });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch workouts',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get workout details
app.get('/api/workouts/:workoutId', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const workout = await getWorkout(workoutId);
    res.json(workout);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch workout',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Download workout
app.get('/api/workouts/:workoutId/download', async (req: Request, res: Response) => {
  try {
    const { workoutId } = req.params;
    const format = (req.query.format as 'zwo' | 'erg') || 'zwo';
    const content = await downloadWorkout(workoutId, format);
    
    res.setHeader('Content-Type', format === 'zwo' ? 'application/xml' : 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="workout.${format}"`);
    res.send(content);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to download workout',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// List activities
app.get('/api/activities', async (req: Request, res: Response) => {
  try {
    const from = parseInt(req.query.from as string) || Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60; // Default: last 7 days
    const to = parseInt(req.query.to as string) || Math.floor(Date.now() / 1000);
    const updatedFrom = req.query.updated_from ? parseInt(req.query.updated_from as string) : undefined;
    
    const activities = await listActivities(from, to, updatedFrom);
    res.json({ success: true, activities });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch activities',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Get activity details
app.get('/api/activities/:activityId', async (req: Request, res: Response) => {
  try {
    const { activityId } = req.params;
    const includeSessionData = req.query.session_data === 'true';
    const activity = await getActivity(activityId, includeSessionData);
    res.json(activity);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch activity',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Upload FIT file (requires multipart/form-data)
app.post('/api/upload', async (req: Request, res: Response) => {
  try {
    // Note: This endpoint requires file upload handling
    // For now, return instructions
    res.status(501).json({
      error: 'File upload not yet implemented via REST API',
      message: 'Please use the MCP server or XERT website for file uploads',
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to upload file',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 XERT API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📈 Training info: http://localhost:${PORT}/api/training-info`);
});
