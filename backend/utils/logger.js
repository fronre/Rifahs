import fs from 'fs';
import path from 'path';

const logFile = path.join(__dirname, 'logs.txt');

export const logError = (message) => {
  const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

export const logInfo = (message) => {
  const logMessage = `[INFO] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};
