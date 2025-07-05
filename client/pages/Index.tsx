import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  Shield,
  Lock,
  Zap,
  Heart,
  Brain,
  MessageCircle,
  Users,
  TrendingUp,
  Search,
  Check,
  Eye,
} from "lucide-react";

export default function Index() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileSelection(files);
    }
  };

  const handleFileSelection = (files: File[]) => {
    // Filter for supported file types
    const supportedFiles = files.filter(
      (file) =>
        file.type === "text/plain" ||
        file.type === "application/json" ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".json"),
    );

    if (supportedFiles.length === 0) {
      alert("Please select .txt or .json files only");
      return;
    }

    if (supportedFiles.some((file) => file.size > 50 * 1024 * 1024)) {
      alert("File size must be less than 50MB");
      return;
    }

    setSelectedFiles(supportedFiles);
  };

  const extractTextFromFiles = async (files: File[]): Promise<string> => {
    let combinedText = "";

    for (const file of files) {
      const text = await file.text();
      combinedText += `\n\n--- Chat from ${file.name} ---\n${text}\n`;
    }

    return combinedText;
  };

  const runAnalysis = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files first");
      return;
    }

    if (!apiKey.trim()) {
      alert("Please enter your Gemini API key");
      return;
    }

    setIsAnalyzing(true);
    setUploadProgress(0);

    try {
      // Extract text from files
      setUploadProgress(25);
      const chatText = await extractTextFromFiles(selectedFiles);

      // Add analysis prompt
      const analysisPrompt = `
Task: Analyze chats between two individuals and extract relationship dynamics with structured details.

Please provide the response in the following exact JSON structure:

{
  "RelationshipStatusAndHistory": {
    "RelationshipHistory": {
      "status": "",
      "details": [
        "on-again, off-again patterns",
        "basis of initial interaction",
        "shift in conversation focus",
        "expressions of liking or love",
        "response patterns"
      ]
    },
    "CurrentStatus": {
      "status": "",
      "details": [
        "romantic tension or resolution",
        "trust issues",
        "emotional defense patterns",
        "conflict areas"
      ]
    }
  },
  "OnAgainOffAgainPattern": {
    "RelationshipTrajectory": {
      "pattern": "",
      "timeline": [
        {
          "date": "",
          "event": ""
        }
      ]
    }
  },
  "CommunicationPatterns": {
    "Frequency": "",
    "ResponseSpeed": {
      "overall": "",
      "sapna": "",
      "rohit": ""
    },
    "Initiation": {
      "sapna": "",
      "rohit": ""
    },
    "LanguageStyle": {
      "informality": "",
      "codeSwitching": true,
      "internetSlang": [],
      "emojiUsage": "",
      "multimediaSharing": ""
    }
  },
  "ProblemSolvingStyle": {
    "pattern": "",
    "sapna": "",
    "rohit": ""
  },
  "EmotionalLandscape": {
    "Sapna": {
      "state": "",
      "keyIndicators": []
    },
    "Rohit": {
      "state": "",
      "keyIndicators": []
    }
  },
  "UnderlyingConnection": {
    "CaringGestures": [],
    "ProtectiveInstincts": [],
    "EmotionalInvestment": ""
  },
  "PowerDynamicsAndControl": {
    "ConversationalPower": {
      "sapna": "",
      "rohit": ""
    },
    "RespectLevels": {
      "duringConflicts": "",
      "baselineInteractions": ""
    }
  },
  "TrustDynamics": {
    "TrustErosion": "",
    "Vulnerability": []
  }
}

Instructions: For each chat pair, populate the fields with concise extracted text and short bullet points where applicable. Dates should be in yyyy-mm-dd format if referenced. List repeated patterns and reference direct phrases from the chats if they show key emotional states.

Chat Data:
${chatText}`;

      // Send to server with API key
      setUploadProgress(50);
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatData: analysisPrompt,
          fileNames: selectedFiles.map((f) => f.name),
          apiKey: apiKey,
        }),
      });

      setUploadProgress(75);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Analysis failed: ${response.statusText}`,
        );
      }

      const analysisResult = await response.json();
      setUploadProgress(100);

      // Navigate to results with the analysis data
      setTimeout(() => {
        navigate("/results", {
          state: {
            analysisData: analysisResult,
            fileNames: selectedFiles.map((f) => f.name),
          },
        });
      }, 500);
    } catch (error) {
      console.error("Analysis error:", error);
      alert(
        `Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setIsAnalyzing(false);
      setUploadProgress(0);
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Relationship Status & History",
      description:
        "Uncover the true nature of your relationships and its evolution over time",
      details: [
        "Current relationship dynamics",
        "Emotional connection strength",
        "On again, off again patterns throughout",
        "Relationship reconciliation cycles",
        "Relationship duration mapping",
      ],
    },
    {
      icon: MessageCircle,
      title: "Communication Patterns",
      description:
        "Deep dive into how you both communicate and what it reveals",
      details: [
        "Message frequency and timing patterns",
        "Response time analysis",
        "Conversation tone analysis",
        "Communication frequency dynamics",
        "Topic preferences and discussion levels",
        "Power working dynamics",
      ],
    },
    {
      icon: Brain,
      title: "Emotional Tone & Content",
      description:
        "Decode the emotional undercurrents within your conversations",
      details: [
        "Overall emotional tone assessment",
        "Conflict and respect emotions",
        "Understanding feelings identification",
        "Empathy and support level analysis",
        "Emotional dependency patterns",
      ],
    },
    {
      icon: Users,
      title: "Interpersonal Dynamics",
      description: "Reveal the hidden power structures and relational patterns",
      details: [
        "Power balance and control dynamics",
        "Dominance and submission patterns",
        "Respect and boundary analysis",
        "Trust level assessment",
        "Mutual relationship balance behaviors",
      ],
    },
    {
      icon: TrendingUp,
      title: "Shared Content & Experiences",
      description: "Analyze your shared digital and shared experiences",
      details: [
        "Media sharing frequency",
        "Common interests identification",
        "Event planning and coordination",
        "Future planning insights",
      ],
    },
    {
      icon: Search,
      title: "Individual Traits & Perceptions",
      description: "Understand how each person sees themselves and each other",
      details: [
        "Self-perception analysis for both individuals",
        "Personal strengths patterns",
        "Personal goals and desires motivation",
        "Accountability and responsibility patterns",
        "Maturity and demeanor insights",
      ],
    },
    {
      icon: TrendingUp,
      title: "Relationship Evolution",
      description:
        "Track relationship patterns and predict future relationship patterns",
      details: [
        "Relationship progression trajectory",
        "Key milestone identification",
        "Commitment level indicator",
        "Critical turning point identification",
        "Relationship health forecasting",
      ],
    },
    {
      icon: Eye,
      title: "Digital Footprint Analysis",
      description: "Examine digital behaviors that reveal deeper truths",
      details: [
        "Platform-specific feature usage patterns",
        "Cross-platform behavior analysis",
        "Digital intimacy indicators",
        "Hidden behavioral patterns",
      ],
    },
    {
      icon: Brain,
      title: "Hidden Psychological Patterns",
      description:
        "AI-powered insights that uncover unconscious patterns and drive behavior",
      details: [
        "Attachment style identification",
        "Communication triggers",
        "Emotional dependency patterns",
        "Subconscious communication cues",
        "Passive aggressive tendency assessment",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Relationship Analyzer
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Secure & Private</span>
            <span className="mx-2">•</span>
            <Brain className="w-4 h-4" />
            <span>Deep Analysis</span>
            <span className="mx-2">•</span>
            <Zap className="w-4 h-4" />
            <span>Revealing Insights</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-6" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Decode Your Digital Connections
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Upload your chat history and uncover the hidden patterns, emotions,
            and dynamics within your relationships
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Upload Your Chat History
            </h2>
            <p className="text-gray-600">
              Support for TXT and JSON formats from popular messaging platforms
            </p>
          </div>

          <Card className="border-2 border-dashed border-gray-300 bg-white">
            <CardContent className="p-12">
              <div
                className={`text-center transition-colors ${
                  dragActive ? "bg-blue-50 border-blue-300" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-16 h-16 mx-auto text-gray-400 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your files here or click to browse
                </h3>
                <p className="text-gray-600 mb-6">
                  Supported formats: .txt, .json (max size: 50MB)
                </p>

                {/* API Key Input */}
                <div className="mb-6 max-w-md mx-auto">
                  <Label
                    htmlFor="api-key"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Gemini API Key *
                  </Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    disabled={isAnalyzing}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get your API key from{" "}
                    <a
                      href="https://makersuite.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg">
                    <p className="text-green-800 font-semibold mb-2">
                      {selectedFiles.length} file(s) selected:
                    </p>
                    {selectedFiles.map((file, index) => (
                      <p key={index} className="text-sm text-green-700">
                        📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </p>
                    ))}
                  </div>
                )}

                {isAnalyzing && (
                  <div className="mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-blue-800 font-semibold mb-2">
                        🔍 Analyzing your conversations...
                      </p>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-blue-600 mt-2">
                        {uploadProgress < 25 && "Reading files..."}
                        {uploadProgress >= 25 &&
                          uploadProgress < 50 &&
                          "Preparing analysis..."}
                        {uploadProgress >= 50 &&
                          uploadProgress < 75 &&
                          "Processing with AI..."}
                        {uploadProgress >= 75 &&
                          uploadProgress < 100 &&
                          "Generating insights..."}
                        {uploadProgress === 100 && "Complete! Redirecting..."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept=".txt,.json"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="file-input"
                    disabled={isAnalyzing}
                  />
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() =>
                      document.getElementById("file-input")?.click()
                    }
                    disabled={isAnalyzing}
                  >
                    Choose Files
                  </Button>

                  {selectedFiles.length > 0 && (
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 ml-4"
                      onClick={runAnalysis}
                      disabled={isAnalyzing || !apiKey.trim()}
                    >
                      {isAnalyzing ? "Analyzing..." : "Run Analysis"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-sm text-gray-600">Export chat as .txt</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Telegram</h3>
              <p className="text-sm text-gray-600">Export as JSON</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Other Platforms
              </h3>
              <p className="text-sm text-gray-600">TXT or JSON format</p>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You'll Discover
            </h2>
            <p className="text-xl text-gray-600">
              Our advanced analysis reveals the hidden layers of your digital
              relationships
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Complete Picture */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <Search className="w-16 h-16 mx-auto text-gray-400 mb-6" />
            <h2 className="text-4xl font-bold mb-4">The Complete Picture</h2>
            <p className="text-xl text-gray-300">
              Our analysis doesn't just look at individual elements - it weaves
              them together to reveal the complete story of your digital
              relationship
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                Holistic Relationship Map
              </h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• Cross-referenced pattern analysis</li>
                <li>• Emotional timeline correlation</li>
                <li>• Timeline correlation insights</li>
                <li>• Multi-dimensional relationship scoring</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Predictive Insights
              </h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• Relationship stability forecasting</li>
                <li>• Potential conflict identification</li>
                <li>• Compatibility score calculation</li>
                <li>• Future behavior pattern predictions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <Lock className="w-16 h-16 mx-auto text-gray-400 mb-6" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Privacy is Sacred
            </h2>
            <p className="text-xl text-gray-600">
              We understand the intimate nature of your conversations. Your data
              is processed securely and never stored.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                End-to-End Encryption
              </h3>
              <p className="text-sm text-gray-600">
                All data is encrypted during transmission and processing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Auto-Delete</h3>
              <p className="text-sm text-gray-600">
                Files are auto-deleted after analysis completion
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                No Human Access
              </h3>
              <p className="text-sm text-gray-600">
                Only AI processes your chats
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Uncover the Truth?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Start your journey into the depths of digital intimacy
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            onClick={() => {
              document.getElementById("upload-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Begin Analysis
          </Button>

          <p className="text-sm text-gray-500 mt-6">
            No registration required • Completely confidential
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">
                  Relationship Analyzer
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Revealing the hidden patterns in your digital relationships
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/how-it-works")}
                    className="hover:text-white transition-colors"
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("/help-center")}
                    className="hover:text-white transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/faq")}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 Relationship Analyzer. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
