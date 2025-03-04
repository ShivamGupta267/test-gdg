import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

export const analyzeAssessment = async (req, res) => {
  try {
    const { conversation, questionCount } = req.body;

    if (!conversation) {
      return res.status(400).json({ success: false, message: "Provide conversation history." });
    }

    let prompt = `
You are a mental health expert with 25+ years experience diagnosing Anxiety, Depression, Social Anxiety, ADHD,.
Ask exactly 20 questions before giving a final diagnosis.
Keep each response concise (max 2 lines).
ONLY ask one question at a time, do not repeat previous questions.
NEVER ask the same question twice, always ask a new one.
DO NOT assume answers, wait for user input before generating the next question.

If this is question 20, STOP asking and PROVIDE A FINAL DIAGNOSIS.
The final response should be detailed (more than 2 lines) and clearly state the most likely disorder or "No Disorder".

Questions asked so far: ${questionCount}/20
Previous conversation:
${conversation}

If fewer than 20 questions have been asked, ask a NEW question.
If 20 questions have been asked, provide the FINAL DIAGNOSIS based on the user’s responses and when you return diagonsis dont ask any question.
`;



    const response = await axios.post(
      `${GEMINI_API_URL}?key=${API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const geminiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    res.json({ success: true, response: geminiResponse });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

