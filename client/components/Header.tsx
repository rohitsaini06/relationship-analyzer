import { Heart, Shield, Brain, Zap } from "lucide-react";

export function Header() {
  return (
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
  );
}
