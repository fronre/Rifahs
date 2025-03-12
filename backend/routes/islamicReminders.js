import express from 'express';
import { getIslamicReminder } from '../controllers/islamicReminderController.js';

const router = express.Router();

router.get('/islamic-reminders', getIslamicReminder);

export default router;
