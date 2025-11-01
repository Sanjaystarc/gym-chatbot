import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors()); 

// Initialize Gemini
// The API key is loaded from the .env file (which we will make next)
const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
//
// --- 🏋️ CUSTOMIZE THIS PART ---
// This is the "system prompt" that defines the bot's job.
//
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `You are 'Flex', a friendly and motivating AI assistant for 'Elite Fitness Gym'.
    
    Your role is to answer user questions about the gym.
    
    Here is the gym's information:
    - Name: Elite Fitness Gym
    - Hours: 
      - Weekdays: 5:00 AM - 11:00 PM
      - Weekends: 7:00 AM - 9:00 PM
    - Membership: $45 per month (no sign-up fee).
    - Classes: We offer Yoga, Spinning, and HIIT. The class schedule is on the '/classes' page.
    - Trainers: Personal trainers are available. Users can book a free consultation online.
    - Phone Number: (555) 123-4567
    
    Your rules:
    1. Be friendly, encouraging, and professional.
    2. Only answer questions related to the gym, fitness, health, and wellness.
    3. If asked about something else, politely decline and steer the conversation back to fitness.
    4. If you don't know an answer, say "That's a great question! I'd recommend calling the front desk at (555) 123-4567 for that specific detail."
    `,
});
// --- END OF CUSTOMIZATION ---
//

// This is the API endpoint the website will call
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const chat = model.startChat();
    const result = await chat.sendMessage(message);
    const response = result.response;

    res.json({ reply: response.text() });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Something went wrong, please try again." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});