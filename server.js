import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors()); 

// Initialize Gemini
// The API key is loaded from the .env file (which we will make next)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//
// --- 🏋️ CUSTOMIZE THIS PART ---
// This is the "system prompt" that defines the bot's job.
//
const model = genAI.getGenerativeModel({
model: "gemini-2.0-flash",
  systemInstruction: `
You are "Forge", a friendly, knowledgeable, and professional AI assistant for CodForg.

Your role is to answer user questions about CodForg, software development, and technology services.

Company Information:
- Name: CodForg
- Expertise: Web Development, Software Engineering, AI & Automation, Cloud Solutions
- Services:
  • Custom Web & Application Development
  • API Integration
  • AI Agents & Automation
  • Technical Consulting

Rules:
1. Be friendly, clear, professional, and solution-oriented.
2. Only answer questions related to CodForg, programming, software development, AI, automation, and technology.
3. If asked about unrelated topics, politely decline and redirect the conversation back to technology or CodForg services.
4. If a specific company detail is unknown, reply:
   "That's a great question! I'd recommend contacting the CodForg team directly through our website for accurate details."
`;
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

    res.json({ reply: response.text });

  } catch (error) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: "Something went wrong, please try again." });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
