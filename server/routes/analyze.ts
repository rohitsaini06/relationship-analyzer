import { RequestHandler } from "express";

export interface AnalysisRequest {
  chatData: string;
  fileNames: string[];
  apiKey: string;
}

export interface AnalysisResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export const handleAnalysis: RequestHandler = async (req, res) => {
  try {
    const { chatData, fileNames, apiKey } = req.body as AnalysisRequest;

    if (!chatData || !fileNames || !apiKey) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: chatData, fileNames, and apiKey",
      });
    }

    console.log("Sending analysis request to Gemini API...");
    console.log("Files being analyzed:", fileNames);

    // Call Gemini API directly
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: chatData,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json().catch(() => ({}));
      throw new Error(
        `Gemini API error: ${geminiResponse.status} ${geminiResponse.statusText}. ${errorData.error?.message || ""}`,
      );
    }

    const geminiResult = await geminiResponse.json();

    // Extract text from Gemini response
    const generatedText =
      geminiResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      throw new Error("No response generated from Gemini API");
    }

    // Parse JSON from the generated text
    let analysisData;
    try {
      // Clean the response text (remove any markdown formatting)
      const cleanedText = generatedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysisData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      console.error("Raw response:", generatedText);

      // Fallback: create structured data from the raw text
      analysisData = {
        participants: ["Person A", "Person B"],
        summary: "Analysis completed successfully",
        relationshipType: "Digital Relationship",
        rawAnalysis: generatedText,
        timeline: [],
        relationshipStatus: {
          current: "Unable to parse detailed status",
          patterns: [],
        },
        communicationPatterns: {
          frequency: "Analysis available in raw text",
          responseTime: "Analysis available in raw text",
          tone: "Analysis available in raw text",
        },
        emotionalAnalysis: {
          overallTone: "Analysis available in raw text",
          participant1: { name: "Person A", emotions: [], patterns: [] },
          participant2: { name: "Person B", emotions: [], patterns: [] },
        },
        insights: {
          keyFindings: ["Analysis completed - see raw analysis for details"],
          recommendations: [],
          warningSignals: [],
        },
      };
    }

    // Return the analysis result
    const response: AnalysisResponse = {
      success: true,
      data: {
        analysis: analysisData,
        metadata: {
          fileNames,
          analyzedAt: new Date().toISOString(),
          fileCount: fileNames.length,
        },
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Analysis error:", error);

    const response: AnalysisResponse = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };

    res.status(500).json(response);
  }
};
