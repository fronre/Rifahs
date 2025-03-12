import axios from 'axios';
import { API_URL } from '../config/apiConfig.js';
const API_KEY = process.env.API_KEY;

export const fetchIslamicContent = async (mood) => {
  try {
    const response = await axios.get(`${API_URL}/azkar/${mood}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Islamic content');
  }
};
