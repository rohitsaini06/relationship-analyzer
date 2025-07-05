import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  Brain,
  Zap,
  MessageCircle,
  Lock,
  Clock,
  Users,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FAQ() {
  const navigate = useNavigate();

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What chat platforms are supported?",
          answer:
            "We support WhatsApp (.txt export), Telegram (JSON export), iMessage, Facebook Messenger, and any platform that can export conversations in TXT or JSON format. Maximum file size is 50MB.",
        },
        {
          question: "How do I export my chat history?",
          answer:
            "Each platform has different export methods. See our detailed platform-specific guide below for step-by-step instructions for WhatsApp, Telegram, Facebook Messenger, iMessage, and 6 other popular platforms.",
        },
        {
          question: "How long does the analysis take?",
          answer:
            "Most analyses complete within 2-5 minutes, depending on the length of your conversation history. You'll see real-time progress updates during processing.",
        },
        {
          question: "Is there a limit to conversation length?",
          answer:
            "We can analyze conversations of any length up to 50MB file size. Longer conversations provide more accurate insights and pattern recognition.",
        },
      ],
    },
    {
      category: "Chat Export Guide",
      questions: [
        {
          question: "WhatsApp Export Instructions",
          answer:
            "📱 Method: Open a chat > Tap ⋮ (3 dots) > More > Export chat > Choose with or without media > Export to email, Google Drive, etc. 📁 Format: .txt (chat log) + optional media files",
        },
        {
          question: "Telegram Export Instructions",
          answer:
            "🖥️ Method: Use Telegram Desktop > Settings > Advanced > Export Telegram data > Select Chats, Photos, Videos, etc. 📁 Format: .html and media folders, nicely organized",
        },
        {
          question: "Facebook Messenger Export Instructions",
          answer:
            "🌐 Method: Visit Facebook Data Download > Select Messages only > Choose HTML or JSON format > Request download 📁 Format: .zip containing messages.html or .json files",
        },
        {
          question: "iMessage (Apple Messages) Export Instructions",
          answer:
            "🍎 Method: On Mac: Open Messages app > Select chat > Use File > Print > Save as PDF. Or use third-party tools (like iMazing) to export full conversations. 📁 Format: PDF or .txt depending on method",
        },
        {
          question: "Instagram DMs Export Instructions",
          answer:
            "📷 Method: Visit Instagram Data Download > Request data via email 📁 Format: .zip with messages.json or messages.html",
        },
        {
          question: "WeChat Export Instructions",
          answer:
            "💬 Method: Use WeChat for Windows/macOS > Go to Settings > Backup & Restore > Choose Backup to PC or transfer to another device. Note: No official way to export as readable text. 📁 Format: WeChat's internal format (not user-friendly without WeChat)",
        },
        {
          question: "Other Platforms (Snapchat, Signal, Line, Discord)",
          answer:
            "📱 Snapchat: Go to Snapchat Data Request > Log in and request data > Wait for email link (Format: .zip with .json files). 🔒 Signal: Does not support readable export for privacy reasons. 📞 Line: Open chat > Tap ☰ (menu) > Chat Settings > Export chat history (Format: .txt). 🎮 Discord: Use browser extensions like DiscordChatExporter or manual copy-paste (Format: .json or HTML via 3rd party tools)",
        },
      ],
    },
    {
      category: "Privacy & Security",
      questions: [
        {
          question: "Is my data safe and private?",
          answer:
            "Absolutely. We use end-to-end encryption, process data only with AI (no human access), and automatically delete all files after analysis completion. We're GDPR compliant and never store your conversations.",
        },
        {
          question: "Who can see my conversations?",
          answer:
            "No one. Only our AI algorithms process your conversations. No human ever sees or has access to your chat data. All processing is automated and secure.",
        },
        {
          question: "How long is my data stored?",
          answer:
            "Your uploaded files are automatically deleted immediately after analysis completion. We don't store any conversation data on our servers.",
        },
        {
          question: "Can I delete my analysis results?",
          answer:
            "Yes, you can download your results and they're not permanently stored on our servers. Each analysis session is independent and private.",
        },
      ],
    },
    {
      category: "Analysis & Results",
      questions: [
        {
          question: "What insights will I get?",
          answer:
            "You'll receive comprehensive analysis across 9 dimensions: relationship status & history, communication patterns, emotional tone, interpersonal dynamics, shared experiences, individual traits, relationship evolution, digital footprint, and hidden psychological patterns.",
        },
        {
          question: "How accurate are the results?",
          answer:
            "Our AI uses advanced natural language processing and psychological analysis models. Accuracy improves with longer conversation histories. Results should be considered insights rather than definitive assessments.",
        },
        {
          question: "Can I analyze group chats?",
          answer:
            "Currently, we specialize in one-on-one relationship analysis for the most accurate insights. Group chat analysis may be available in future updates.",
        },
        {
          question: "What if the analysis seems wrong?",
          answer:
            "AI analysis provides patterns and insights based on text data. Results may not capture context like tone of voice, sarcasm, or external factors. Use results as one perspective among many in understanding your relationship.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What file formats are accepted?",
          answer:
            "We accept .txt files (plain text format) and .json files (structured data format). Make sure your export doesn't include media files, only the text conversations.",
        },
        {
          question: "My upload failed. What should I do?",
          answer:
            "Check that your file is under 50MB and in the correct format (.txt or .json). If problems persist, try exporting a smaller date range or contact our support team.",
        },
        {
          question: "Can I analyze multiple relationships?",
          answer:
            "Yes! Each analysis is separate. You can analyze different relationships by uploading different conversation exports. Each analysis is independent and private.",
        },
        {
          question: "Is there customer support available?",
          answer:
            "Yes, our support team is available through our Help Center and Contact Us page. We typically respond within 24 hours for technical issues.",
        },
      ],
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
          <HelpCircle className="w-16 h-16 mx-auto text-purple-600 mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Find answers to common questions about our relationship analysis
            platform
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                  {categoryIndex + 1}
                </div>
                {category.category}
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`${categoryIndex}-${index}`}
                    className="border border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Help
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-200">
              <CardHeader className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Learn how to export and upload your chat history
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/how-it-works")}
                >
                  View Guide
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Get personalized help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button variant="outline" onClick={() => navigate("/contact")}>
                  Contact Us
                </Button>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader className="text-center">
                <Brain className="w-12 h-12 mx-auto text-purple-600 mb-4" />
                <CardTitle>Help Center</CardTitle>
                <CardDescription>
                  Browse comprehensive documentation and guides
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  variant="outline"
                  onClick={() => navigate("/help-center")}
                >
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Our support team is here to help you get the most out of your
            relationship analysis
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
              onClick={() => navigate("/help-center")}
            >
              Help Center
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
