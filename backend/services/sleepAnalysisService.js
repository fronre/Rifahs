import { OpenAI } from "langchain/llms/openai";
import dotenv from "dotenv";
dotenv.config();

const ai = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

export const generateSleepReport = async (userData) => {
  const prompt = `Analyze the following sleep data and provide recommendations:\n${JSON.stringify(userData)}`;
  const report = await ai.call(prompt);
  return report;
};
