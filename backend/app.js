import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import islamicRemindersRoute from './routes/islamicReminders.js';
import sleepDataRoute from './routes/sleepData.js';
import prisma from './config/database.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Use routes
app.use('/api', islamicRemindersRoute);
app.use('/api', sleepDataRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
