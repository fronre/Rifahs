import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import islamicRemindersRoute from './routes/islamicReminders.js';
import sleepDataRoute from './routes/sleepData.js';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(cors());

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json(user);
});

// User login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.password === password) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

// Add sleep data
app.post('/sleep-log', authenticateToken, async (req, res) => {
  const { sleepStart, sleepEnd, deepSleep, interruptions, caffeine, screenTime } = req.body;
  const sleepLog = await prisma.sleepLog.create({
    data: {
      userId: req.user.userId,
      sleepStart,
      sleepEnd,
      deepSleep,
      interruptions,
      caffeine,
      screenTime,
    },
  });
  res.json(sleepLog);
});

// Fetch user sleep logs
app.get('/sleep-log/:userId', authenticateToken, async (req, res) => {
  const sleepLogs = await prisma.sleepLog.findMany({
    where: { userId: req.params.userId },
  });
  res.json(sleepLogs);
});

// Fetch AI-generated reports
app.get('/reports/:userId', authenticateToken, async (req, res) => {
  const reports = await prisma.report.findMany({
    where: { userId: req.params.userId },
  });
  res.json(reports);
});

// Get mood-based Islamic content
app.get('/islamic-reminders/:moodType', authenticateToken, async (req, res) => {
  const reminders = await prisma.islamicReminders.findMany({
    where: { moodType: req.params.moodType },
  });
  res.json(reminders);
});

// Get top users for leaderboard
app.get('/leaderboard', async (req, res) => {
  const leaderboard = await prisma.leaderboardEntry.findMany({
    orderBy: { sleepScore: 'desc' },
  });
  res.json(leaderboard);
});

// Create discussion post
app.post('/community-post', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const post = await prisma.communityPost.create({
    data: {
      userId: req.user.userId,
      content,
    },
  });
  res.json(post);
});

// Use routes
app.use('/api', islamicRemindersRoute);
app.use('/api', sleepDataRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
