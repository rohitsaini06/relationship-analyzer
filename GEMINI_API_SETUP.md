# Gemini API Integration - Direct Setup

This document explains the direct Gemini API integration for relationship analysis.

## Architecture Overview

```
Frontend (React) → Express Server → Gemini API (Direct)
```

1. **Frontend**: Handles file upload, API key input, and displays results
2. **Express Server**: Processes files and calls Gemini API directly
3. **Gemini API**: Performs the actual AI analysis

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key for use in the application

### 2. Using the Application

1. **Start the application**:

   ```bash
   npm run dev
   ```

2. **Upload Files**:

   - Click "Choose Files" or drag & drop chat files (.txt, .json)
   - Supported formats: WhatsApp exports, Telegram JSON, etc.

3. **Enter API Key**:

   - Paste your Gemini API key in the "Gemini API Key" field
   - The key is only used for the current session and not stored

4. **Run Analysis**:
   - Click "Run Analysis" to process your chat files
   - The system will extract text, send to Gemini API, and display results

### 3. Supported File Formats

- **WhatsApp**: .txt exports (without media)
- **Telegram**: .json exports from desktop app
- **Generic**: Any .txt or .json file containing chat data
- **Size limit**: 50MB per file

### 4. How It Works

1. **File Processing**: Text is extracted from uploaded files
2. **Prompt Creation**: A comprehensive analysis prompt is added
3. **API Call**: Data sent to Gemini Pro API with user's key
4. **Response Processing**: JSON response parsed and structured
5. **Results Display**: Analysis presented in organized sections

### 5. Analysis Dimensions

The system analyzes:

1. **Relationship Status & History**
2. **Communication Patterns**
3. **Emotional Tone & Content**
4. **Interpersonal Dynamics**
5. **Shared Content & Experiences**
6. **Individual Traits & Perceptions**
7. **Relationship Evolution**
8. **Digital Footprint Analysis**
9. **Hidden Psychological Patterns**

### 6. Expected Response Structure

Gemini returns JSON with:

```json
{
  "participants": ["Name1", "Name2"],
  "summary": "Brief relationship summary",
  "relationshipType": "Type of relationship",
  "timeline": [...],
  "relationshipStatus": {...},
  "communicationPatterns": {...},
  "emotionalAnalysis": {...},
  "powerDynamics": {...},
  "insights": {
    "keyFindings": [...],
    "recommendations": [...],
    "warningSignals": [...]
  }
}
```

### 7. Troubleshooting

**API Key Issues**:

- Ensure your API key is valid and active
- Check if you have sufficient quota/credits
- Verify the key has Gemini API access

**Large Files**:

- Break large conversations into smaller chunks
- Remove unnecessary content before upload
- Consider using date ranges for exports

**JSON Parsing Errors**:

- The system includes fallback to display raw analysis
- Gemini sometimes returns non-JSON responses
- Check the "Detailed Analysis" section for raw output

**Network Issues**:

- Check your internet connection
- Gemini API may have rate limits
- Try again after a few minutes if requests fail

### 8. Privacy & Security

- **API Key**: Entered by user, not stored anywhere
- **Chat Data**: Processed in memory, never saved to server
- **Gemini API**: Google's privacy policies apply
- **Local Processing**: File extraction happens locally in browser

### 9. Rate Limits

Gemini API has usage limits:

- **Free tier**: Limited requests per minute/day
- **Paid tier**: Higher limits based on plan
- **Large files**: May consume more tokens

### 10. Development

To modify the analysis prompt or add features:

1. **Prompt**: Edit in `client/pages/Index.tsx` in the `runAnalysis` function
2. **Response parsing**: Update in `server/routes/analyze.ts`
3. **Results display**: Modify `client/pages/Results.tsx`

The system is designed to be flexible and can be extended with additional analysis dimensions or different AI models.
