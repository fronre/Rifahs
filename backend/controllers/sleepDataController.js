import prisma from '../config/database.js';

export const addSleepLog = async (req, res) => {
  const { sleepStart, sleepEnd, deepSleep, interruptions, caffeine, screenTime } = req.body;
  try {
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
  } catch (error) {
    res.status(500).json({ msg: "Error adding sleep log", error: error.message });
  }
};

export const getSleepLogs = async (req, res) => {
  try {
    const sleepLogs = await prisma.sleepLog.findMany({
      where: { userId: req.params.userId },
    });
    res.json(sleepLogs);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving sleep logs", error: error.message });
  }
};
