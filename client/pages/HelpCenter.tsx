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
  BookOpen,
  MessageCircle,
  Settings,
  Lock,
  HelpCircle,
  FileText,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HelpCenter() {
  const navigate = useNavigate();

  const helpCategories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of relationship analysis",
      articles: [
        "How to export WhatsApp chats",
        "How to export Telegram chats",
        "How to export Facebook Messenger",
        "How to export iMessage/Apple Messages",
        "How to export Instagram DMs",
        "How to export from other platforms",
        "Supported file formats",
        "Upload troubleshooting",
        "First-time user guide",
      ],
    },
    {
      icon: Settings,
      title: "Using the Platform",
      description: "Make the most of our analysis features",
      articles: [
        "Understanding your results",
        "Interpreting analysis charts",
        "Downloading reports",
        "Multiple relationship analysis",
      ],
    },
    {
      icon: Lock,
      title: "Privacy & Security",
      description: "Your data protection and privacy",
      articles: [
        "Data encryption and security",
        "Privacy policy explained",
        "Data deletion process",
        "GDPR compliance",
      ],
    },
    {
      icon: MessageCircle,
      title: "Technical Support",
      description: "Troubleshooting and technical help",
      articles: [
        "Upload issues and solutions",
        "Browser compatibility",
        "File size limitations",
        "Error messages explained",
      ],
    },
    {
      icon: Brain,
      title: "Understanding Results",
      description: "How to interpret your analysis",
      articles: [
        "Analysis methodology",
        "Accuracy and limitations",
        "Relationship patterns explained",
        "Using insights effectively",
      ],
    },
    {
      icon: Users,
      title: "Account & Billing",
      description: "Account management and usage",
      articles: [
        "Account settings",
        "Usage limits",
        "Analysis history",
        "Contact preferences",
      ],
    },
  ];

  const quickActions = [
    {
      icon: MessageCircle,
      title: "Contact Support",
      description: "Get help from our support team",
      action: () => navigate("/contact"),
    },
    {
      icon: HelpCircle,
      title: "View FAQ",
      description: "Browse frequently asked questions",
      action: () => navigate("/faq"),
    },
    {
      icon: FileText,
      title: "How It Works",
      description: "Learn about our analysis process",
      action: () => navigate("/how-it-works"),
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
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto text-center max-w-4xl">
          <BookOpen className="w-16 h-16 mx-auto text-purple-600 mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Help Center
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Find guides, tutorials, and answers to help you get the most out of
            your relationship analysis
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <action.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <ArrowRight className="w-5 h-5 mx-auto text-purple-600" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Export Guide */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Complete Chat Export Guide
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Step-by-step instructions for exporting chat history from 10 popular
            messaging platforms
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">📱 Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Open a chat</li>
                    <li>Tap ⋮ (3 dots)</li>
                    <li>More → Export chat</li>
                    <li>Choose with or without media</li>
                    <li>Export to email, Google Drive, etc.</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    .txt (chat log) + optional media
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Telegram */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                  Telegram
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">🖥️ Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Use Telegram Desktop</li>
                    <li>Settings → Advanced</li>
                    <li>Export Telegram data</li>
                    <li>Select Chats, Photos, Videos, etc.</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    .html and media folders, nicely organized
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Facebook Messenger */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-blue-700" />
                  Facebook Messenger
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">🌐 Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Visit Facebook Data Download</li>
                    <li>Select Messages only</li>
                    <li>Choose HTML or JSON format</li>
                    <li>Request download</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    .zip containing messages.html or .json
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* iMessage */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-gray-800" />
                  iMessage (Apple)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">🍎 Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>On Mac: Open Messages app</li>
                    <li>Select chat</li>
                    <li>File → Print → Save as PDF</li>
                    <li>Or use third-party tools (iMazing)</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    PDF or .txt depending on method
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Instagram DMs */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-pink-600" />
                  Instagram DMs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">📷 Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Visit Instagram Data Download</li>
                    <li>Request data via email</li>
                    <li>Wait for download link</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    .zip with messages.json or messages.html
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* WeChat */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-green-700" />
                  WeChat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-semibold text-gray-900 mb-2">💬 Method:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-600">
                    <li>Use WeChat for Windows/macOS</li>
                    <li>Settings → Backup & Restore</li>
                    <li>Backup to PC or transfer</li>
                  </ol>
                  <p className="font-semibold text-gray-900 mt-3 mb-1">
                    📁 Format:
                  </p>
                  <p className="text-gray-600">
                    WeChat's internal format (not user-friendly)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Platforms */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Additional Platforms
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">📱 Snapchat</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-gray-600 mb-2">
                    Snapchat Data Request → Request data → Email link
                  </p>
                  <p className="font-semibold">Format: .zip with .json files</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">🔒 Signal</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-gray-600 mb-2">
                    No readable export (privacy reasons)
                  </p>
                  <p className="font-semibold">Format: Encrypted backup only</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">📞 Line</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-gray-600 mb-2">
                    Chat → ☰ → Chat Settings → Export
                  </p>
                  <p className="font-semibold">Format: .txt</p>
                </CardContent>
              </Card>

              <Card className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">🎮 Discord</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-gray-600 mb-2">
                    Use DiscordChatExporter or manual copy-paste
                  </p>
                  <p className="font-semibold">Format: .json or HTML</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Browse by Category
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.articles.map((article, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>{article}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Can't Find What You Need?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Our support team is here to help with any questions or issues
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => navigate("/contact")}
            >
              Contact Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-900"
              onClick={() => navigate("/faq")}
            >
              Browse FAQ
            </Button>
          </div>
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
