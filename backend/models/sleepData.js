import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSleepLog = async (data) => {
  return await prisma.sleepLog.create({ data });
};

export const findSleepLogsByUserId = async (userId) => {
  return await prisma.sleepLog.findMany({ where: { userId } });
};
