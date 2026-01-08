import express from "express";
import cors from "cors";
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Validate API key early */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing");
}

/* Gemini setup */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
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
3. If asked about unrelated topics, politely decline and redirect the conversation back to CodForg services.
4. If a specific company detail is unknown, reply:
   "That's a great question! I'd recommend contacting the CodForg team directly through our website for accurate details."
5. Answer shortly, don't answer very long.
`
});

/* API Route */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("➡️ User message:", message);

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Invalid message" });
    }

    const chat = model.startChat();
    const result = await chat.sendMessage(message);

    const reply =
      result?.response?.text?.()?.trim() ||
      "Hi 👋 How can I help you with CodForg today?";

    console.log("✅ Gemini reply:", reply);

    res.json({ reply });

  } catch (error) {
    console.error("🔥 Gemini API error:", error);

    res.status(500).json({
      error: "AI service unavailable. Please try again shortly."
    });
  }
});

/* Server */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
