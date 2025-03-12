import express from 'express';
import { addSleepLog, getSleepLogs } from '../controllers/sleepDataController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/sleep-log', authenticateToken, addSleepLog);
router.get('/sleep-log/:userId', authenticateToken, getSleepLogs);

export default router;
