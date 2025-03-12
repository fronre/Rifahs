import axios from 'axios';

export const getIslamicReminder = async (req, res) => {
  const { mood } = req.query;
  if (!mood) {
    return res.status(400).json({ msg: "Mood parameter is required" });
  }

  try {
    const response = await axios.get(`https://api.example.com/azkar/${mood}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving Islamic reminder", error: error.message });
  }
};
