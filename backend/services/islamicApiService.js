import axios from 'axios';
import { API_URL, API_KEY } from '../config/apiConfig.js';

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
