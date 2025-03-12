import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import islamicRemindersRoute from './routes/islamicReminders.js';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', islamicRemindersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
