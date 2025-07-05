import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Brain,
  Zap,
  MessageCircle,
  Users,
  TrendingUp,
  Search,
  Eye,
  Lock,
  BarChart3,
  Clock,
  Activity,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  const analysisFeatures = [
    {
      icon: Heart,
      title: "Relationship Status & History",
      description:
        "Uncover the true nature of your relationships and its evolution over time",
      features: [
        "Current relationship dynamics",
        "Emotional connection strength",
        "On again, off again patterns",
        "Relationship reconciliation cycles",
        "Duration mapping and milestones",
      ],
    },
    {
      icon: MessageCircle,
      title: "Communication Patterns",
      description:
        "Deep dive into how you both communicate and what it reveals",
      features: [
        "Message frequency and timing",
        "Response time analysis",
        "Conversation tone assessment",
        "Topic preferences analysis",
        "Power dynamic indicators",
      ],
    },
    {
      icon: Brain,
      title: "Emotional Tone & Content",
      description:
        "Decode the emotional undercurrents within your conversations",
      features: [
        "Overall emotional tone assessment",
        "Conflict and respect emotions",
        "Empathy and support level analysis",
        "Emotional dependency patterns",
        "Sentiment trend tracking",
      ],
    },
    {
      icon: Users,
      title: "Interpersonal Dynamics",
      description: "Reveal the hidden power structures and relational patterns",
      features: [
        "Power balance analysis",
        "Dominance and submission patterns",
        "Respect and boundary assessment",
        "Trust level indicators",
        "Mutual relationship balance",
      ],
    },
    {
      icon: TrendingUp,
      title: "Relationship Evolution",
      description: "Track patterns and predict future relationship trends",
      features: [
        "Relationship progression trajectory",
        "Key milestone identification",
        "Commitment level indicators",
        "Critical turning points",
        "Health forecasting",
      ],
    },
    {
      icon: Search,
      title: "Hidden Psychological Patterns",
      description:
        "AI-powered insights that uncover unconscious behavioral patterns",
      features: [
        "Attachment style identification",
        "Communication triggers",
        "Subconscious communication cues",
        "Passive aggressive tendencies",
        "Behavioral pattern recognition",
      ],
    },
  ];

  const platformFeatures = [
    {
      icon: MessageCircle,
      title: "Multi-Platform Support",
      description: "Works with all major messaging platforms",
      platforms: ["WhatsApp", "Telegram", "iMessage", "Facebook Messenger"],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive data visualization and insights",
      platforms: [
        "Interactive charts",
        "Timeline views",
        "Trend analysis",
        "Comparative metrics",
      ],
    },
    {
      icon: Clock,
      title: "Real-Time Processing",
      description: "Fast analysis with immediate results",
      platforms: [
        "Quick upload processing",
        "Instant analysis",
        "Real-time insights",
        "Fast export",
      ],
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects your data",
    },
    {
      icon: Eye,
      title: "No Human Access",
      description: "Only AI processes your conversations",
    },
    {
      icon: Shield,
      title: "Auto-Delete",
      description: "Files automatically deleted after analysis",
    },
    {
      icon: CheckCircle,
      title: "GDPR Compliant",
      description: "Full compliance with privacy regulations",
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
            Powerful Features
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive relationship analysis powered by advanced AI
            technology and deep psychological insights
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 text-sm">
            9 Analysis Dimensions • AI-Powered • Privacy-First
          </Badge>
        </div>
      </section>

      {/* Analysis Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Relationship Analysis
            </h2>
            <p className="text-xl text-gray-600">
              Deep insights across 6 key relationship dimensions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {analysisFeatures.map((feature, index) => (
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
                    {feature.features.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Advanced technology stack for comprehensive analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="border border-gray-200">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.platforms.map((platform, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="justify-center"
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Security & Privacy</h2>
            <p className="text-xl text-gray-300">
              Enterprise-grade security protecting your most sensitive data
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800 border-gray-700 text-white"
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Experience All Features
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Discover the full power of relationship analysis with our
            comprehensive feature set
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3"
            onClick={() => navigate("/")}
          >
            Start Your Analysis
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
