# Gemini API Integration Setup

This document explains how to set up your local server to integrate with Google's Gemini API for relationship analysis.

## Architecture Overview

```
Frontend (React) → Express Server → Your Local Server → Gemini API
```

1. **Frontend**: Handles file upload and displays results
2. **Express Server**: Processes files and forwards to your local server
3. **Your Local Server**: Handles Gemini API communication
4. **Gemini API**: Performs the actual AI analysis

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_URL=http://localhost:3001/api/gemini
GEMINI_API_KEY=your_gemini_api_key_here
```

### 2. Local Server Requirements

Your local server should:

- Run on `http://localhost:3001` (or update the GEMINI_API_URL)
- Accept POST requests to `/api/gemini`
- Forward requests to Gemini API
- Return JSON responses

### 3. Expected Request Format

The Express server sends:

```json
{
  "prompt": "Please analyze the following chat conversation(s)...[chat data]",
  "fileNames": ["chat1.txt", "chat2.json"]
}
```

### 4. Expected Response Format

Your local server should return:

```json
{
  "analysis": {
    "participants": ["Person1", "Person2"],
    "summary": "Brief relationship summary",
    "relationshipType": "Complex Relationship",
    "timeline": [
      {
        "date": "2024-01-01",
        "status": "Event description",
        "type": "event_type"
      }
    ],
    "relationshipStatus": {
      "current": "Current status",
      "patterns": ["Pattern 1", "Pattern 2"]
    },
    "communicationPatterns": {
      "frequency": "Analysis of message frequency",
      "responseTime": "Response time patterns",
      "topics": ["Main topics discussed"]
    },
    "emotionalAnalysis": {
      "overallTone": "Emotional tone assessment",
      "participant1": {
        "name": "Person1",
        "emotions": ["emotion1", "emotion2"],
        "patterns": ["pattern1", "pattern2"]
      },
      "participant2": {
        "name": "Person2",
        "emotions": ["emotion1", "emotion2"],
        "patterns": ["pattern1", "pattern2"]
      }
    }
  }
}
```

### 5. Example Local Server (Node.js/Express)

```javascript
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response from Gemini
    const analysis = JSON.parse(text);

    res.json(analysis);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Analysis failed" });
  }
});

app.listen(3001, () => {
  console.log("Local server running on port 3001");
});
```

### 6. Testing

1. Start your local server: `node local-server.js`
2. Start the main app: `npm run dev`
3. Upload chat files and run analysis
4. Check console logs for API communication

## Troubleshooting

- **Connection refused**: Check if your local server is running on the correct port
- **API key errors**: Verify your Gemini API key is correct
- **JSON parsing errors**: Ensure Gemini returns valid JSON format
- **File size errors**: Large files may timeout - consider chunking

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Consider rate limiting for production use
- Validate file uploads for security
