import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Heart,
  Shield,
  Brain,
  Zap,
  Upload,
  MessageCircle,
  BarChart3,
  Download,
  Lock,
  Eye,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      step: 1,
      icon: Upload,
      title: "Upload Your Chat History",
      description:
        "Export your chat history from WhatsApp, Telegram, or any messaging platform",
      details: [
        "Support for TXT and JSON formats",
        "WhatsApp: Export chat as .txt file",
        "Telegram: Export as JSON format",
        "Other platforms: TXT or JSON format",
        "Maximum file size: 50MB",
      ],
    },
    {
      step: 2,
      icon: Brain,
      title: "AI-Powered Analysis",
      description:
        "Our advanced AI algorithms analyze your conversations across multiple dimensions",
      details: [
        "Natural language processing",
        "Sentiment analysis and emotion detection",
        "Communication pattern recognition",
        "Relationship dynamics mapping",
        "Timeline and trend analysis",
      ],
    },
    {
      step: 3,
      icon: BarChart3,
      title: "Comprehensive Insights",
      description:
        "Receive detailed analysis across 9 key relationship dimensions",
      details: [
        "Relationship status and history",
        "Communication patterns",
        "Emotional tone and content",
        "Power dynamics and control",
        "Hidden psychological patterns",
      ],
    },
    {
      step: 4,
      icon: Download,
      title: "Actionable Results",
      description:
        "Get your complete relationship analysis report with actionable insights",
      details: [
        "Downloadable PDF report",
        "Visual charts and timelines",
        "Key insights and recommendations",
        "Relationship health score",
        "Future pattern predictions",
      ],
    },
  ];

  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your data is encrypted during transmission and processing",
    },
    {
      icon: Eye,
      title: "No Human Access",
      description:
        "Only AI processes your chats - no human ever sees your data",
    },
    {
      icon: Shield,
      title: "Auto-Delete",
      description: "Files are automatically deleted after analysis completion",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">
              Relationship Analyzer
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the hidden patterns in your digital relationships through
            our 4-step AI-powered analysis process
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-12 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-xl text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <ArrowRight className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-32 h-32 text-purple-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Your Privacy is Our Priority
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            We understand the sensitive nature of your conversations. Our
            security measures ensure your data stays private.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Uncover the Truth?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Start your journey into understanding your digital relationships
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            onClick={() => navigate("/")}
          >
            Begin Analysis
          </Button>
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
