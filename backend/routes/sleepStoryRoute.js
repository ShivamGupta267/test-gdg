import express from "express";
import axios from "axios";

const router = express.Router();

// ✅ Fetch a Daily Sleep Story from LibriVox
router.get("/daily", async (req, res) => {
  try {
    const response = await axios.get(
      "https://librivox.org/api/feed/audiobooks?format=json&genre=Fairy+Tales"
    );
    
    const books = response.data.books;
    const todayIndex = new Date().getDate() % books.length;
    const dailyStory = books[todayIndex];

    res.json({
      title: dailyStory.title,
      author: dailyStory.authors[0].first_name,
      audio_url: dailyStory.zip_url,
      description: dailyStory.description
    });
  } catch (error) {
    console.error("Error fetching sleep story:", error);
    res.status(500).json({ message: "Failed to fetch sleep story" });
  }
});

export default router;
