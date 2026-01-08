# CodForg Chatbot

A secure backend chatbot powered by Google's Gemini AI API. Designed for CodForg to answer questions about services, development, and technology.

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/app/apikey))

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`

## 📡 API Endpoint

**POST** `/api/chat`

Request:
```json
{
  "message": "Your question here"
}
```

Response:
```json
{
  "reply": "AI response"
}
```

## 🌐 Render Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New +** → **Web Service**
3. Select your GitHub repository
4. Configure:
   - **Name**: `codforg-chatbot` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier is fine

### Step 3: Add Environment Variables
In Render dashboard:
1. Go to **Environment** section
2. Add variable:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your actual Gemini API key
3. Click **Deploy**

### Step 4: Verify Deployment
- Render will build and deploy automatically
- Check the deployment logs in Render dashboard
- Your API will be available at: `https://codforg-chatbot.onrender.com/api/chat`

## ⚙️ Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | - | Google Gemini API key |
| `PORT` | No | 5000 | Server port |

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **AI**: Google Generative AI (Gemini)
- **Middleware**: CORS, Express JSON

## 📝 Customization

Edit the `systemInstruction` in [server.js](server.js) to modify the AI assistant's behavior and personality.

## ❌ Troubleshooting

**Issue**: "GEMINI_API_KEY is undefined"
- **Fix**: Ensure the environment variable is set in Render dashboard

**Issue**: CORS errors
- **Fix**: CORS is already enabled for all origins

**Issue**: 500 error on `/api/chat`
- **Fix**: Check Render logs and verify API key is valid

## 📄 License

MIT
