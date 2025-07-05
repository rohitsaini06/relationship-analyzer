# 💕 Relationship Analyzer

A sophisticated AI-powered web application that analyzes digital conversations to reveal hidden relationship dynamics, communication patterns, and emotional insights.

![Relationship Analyzer](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)

## 🌟 Overview

Relationship Analyzer is a comprehensive platform that uses advanced AI technology to analyze chat conversations and provide deep insights into relationship dynamics. The application processes chat exports from popular messaging platforms and generates detailed reports covering emotional patterns, communication styles, power dynamics, and relationship evolution.

### ✨ Key Features

- **🤖 AI-Powered Analysis**: Integration with Google's Gemini API for sophisticated natural language processing
- **📱 Multi-Platform Support**: Supports WhatsApp, Telegram, iMessage, Facebook Messenger, and more
- **🔐 Privacy-First**: End-to-end encryption, no data storage, user-provided API keys
- **📊 Comprehensive Reports**: 8 analysis dimensions with detailed insights
- **📄 Export Options**: HTML and PDF report generation
- **🎨 Modern UI**: Responsive design with TailwindCSS and Radix UI components
- **⚡ Real-Time Processing**: Live progress tracking during analysis
- **🌐 Full-Stack Solution**: Integrated frontend and backend with Express.js

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │────│  Express Server │────│   Gemini API    │
│                 │    │                 │    │                 │
│ • File Upload   │    │ • File Processing│    │ • AI Analysis   │
│ • UI Components │    │ • API Integration│    │ • JSON Response │
│ • Result Display│    │ • Error Handling │    │ • Insights Gen. │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Tech Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript 5.5.3** - Type safety and developer experience
- **Vite 6.2.2** - Fast build tool and dev server
- **TailwindCSS 3.4.11** - Utility-first CSS framework
- **Radix UI** - Accessible UI component library
- **React Router 6.26.2** - Client-side routing

### Backend

- **Express 4.18.2** - Web application framework
- **Node.js 16+** - JavaScript runtime
- **TypeScript** - Type-safe backend development
- **Zod 3.23.8** - Schema validation

### AI & APIs

- **Google Gemini API** - Advanced language model for analysis
- **Gemini 1.5 Flash** - Fast and efficient model variant

### UI Components & Icons

- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library
- **Sonner** - Toast notifications
- **Class Variance Authority** - Component variants

## 📁 Project Structure

```
relationship-analyzer/
├── client/                      # React frontend application
│   ├── components/ui/          # Reusable UI components (40+ components)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── pages/                  # Route components
│   │   ├── Index.tsx          # Homepage with upload functionality
│   │   ├── Results.tsx        # Analysis results display
│   │   ├── Features.tsx       # Feature showcase
│   │   ├── HowItWorks.tsx     # Process explanation
│   │   ├── FAQ.tsx            # Frequently asked questions
│   │   ├── HelpCenter.tsx     # Documentation and guides
│   │   ├── Contact.tsx        # Contact form
│   │   └── NotFound.tsx       # 404 error page
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions
│   ├── App.tsx                # Main app component with routing
│   └── global.css             # Global styles and theme
├── server/                     # Express backend
│   ├── routes/                # API route handlers
│   │   ├── analyze.ts         # Main analysis endpoint
│   │   └── demo.ts            # Demo endpoint
│   └── index.ts               # Server configuration
├── shared/                     # Shared types and interfaces
│   └── api.ts                 # API type definitions
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # TailwindCSS configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js 16+** (LTS recommended)
- **npm** or **yarn** package manager
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/relationship-analyzer.git
   cd relationship-analyzer
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Development Scripts

```bash
# Development
npm run dev              # Start dev server (client + server)
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run typecheck       # TypeScript validation
npm test               # Run test suite
npm run format.fix     # Format code with Prettier
```

## 📖 Usage Guide

### 1. Obtaining API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key for use in the application

### 2. Uploading Chat Files

**Supported Formats:**

- **WhatsApp**: `.txt` exports (Settings → Chats → Export Chat → Without Media)
- **Telegram**: `.json` exports (Desktop app → Settings → Advanced → Export Data)
- **Facebook Messenger**: `.json` from Data Download
- **iMessage**: `.txt` or `.pdf` exports
- **Generic**: Any `.txt` or `.json` file with chat data

**File Requirements:**

- Maximum size: 50MB per file
- Multiple files supported
- Text-based formats only

### 3. Running Analysis

1. **Upload Files**: Drag & drop or click "Choose Files"
2. **Enter API Key**: Paste your Gemini API key
3. **Run Analysis**: Click "Run Analysis" button
4. **View Results**: Comprehensive analysis report

### 4. Exporting Reports

- **Download HTML**: Complete report as standalone HTML file
- **Export PDF**: Print-optimized PDF version
- **Share Results**: Navigate between analysis sections

## 🧠 Analysis Dimensions

The AI analyzes conversations across 8 comprehensive dimensions:

### 1. **Relationship Status & History**

- Current relationship status
- Historical patterns and evolution
- On-again/off-again dynamics
- Timeline of significant events

### 2. **Communication Patterns**

- Message frequency and timing
- Response speed analysis
- Conversation initiation patterns
- Language style and formality

### 3. **Emotional Landscape**

- Individual emotional states
- Key emotional indicators
- Underlying connection patterns
- Caring gestures and protective instincts

### 4. **Power Dynamics & Control**

- Conversational power balance
- Respect levels during conflicts
- Trust dynamics and erosion
- Vulnerability patterns

### 5. **Problem-Solving Styles**

- Individual approaches to conflict
- Resolution patterns
- Communication strategies

### 6. **Language Analysis**

- Informality levels
- Code-switching patterns
- Internet slang usage
- Emoji and multimedia sharing

### 7. **Trust & Vulnerability**

- Trust erosion indicators
- Vulnerability sharing patterns
- Emotional investment levels

### 8. **Relationship Trajectory**

- Pattern recognition
- Timeline analysis
- Future trend predictions

## 🔧 API Integration

### Gemini API Configuration

The application uses Google's Gemini 1.5 Flash model for analysis:

```typescript
// API Endpoint
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

// Request Format
{
  "contents": [{
    "parts": [{
      "text": "Analysis prompt + chat data"
    }]
  }],
  "generationConfig": {
    "temperature": 0.7,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 8192
  }
}
```

### Response Structure

```typescript
interface AnalysisResponse {
  RelationshipStatusAndHistory: {
    RelationshipHistory: {
      status: string;
      details: string[];
    };
    CurrentStatus: {
      status: string;
      details: string[];
    };
  };
  CommunicationPatterns: {
    Frequency: string;
    ResponseSpeed: {
      overall: string;
      sapna: string;
      rohit: string;
    };
    // ... more fields
  };
  // ... other analysis dimensions
}
```

## 🎨 UI Components

### Design System

- **Color Scheme**: Purple-blue gradient theme
- **Typography**: Modern sans-serif fonts
- **Spacing**: Consistent 8px grid system
- **Shadows**: Subtle depth with careful elevation
- **Animations**: Smooth transitions and micro-interactions

### Key Components

```typescript
// Button variants
<Button variant="default|destructive|outline|secondary|ghost|link"
        size="default|sm|lg|icon" />

// Card layouts
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Input fields
<Input type="text|password|email" placeholder="..." />
<Textarea rows={4} placeholder="..." />
```

## 🚀 Deployment

### Build Process

```bash
# 1. Install dependencies
npm install

# 2. Build client and server
npm run build

# 3. Start production server
npm run start
```

### Environment Variables

Create `.env` file for production:

```env
NODE_ENV=production
PORT=8080
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
```

### Platform Deployment

**Netlify/Vercel:**

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

**Railway/Render:**

- Build command: `npm run build`
- Start command: `npm run start`
- Port: 8080

## 🔒 Security & Privacy

### Data Protection

- **No Data Storage**: Files processed in memory only
- **Auto-Deletion**: Temporary data cleared after analysis
- **User-Controlled Keys**: API keys provided by users
- **HTTPS Encryption**: All communications encrypted

### Privacy Features

- **Client-Side Processing**: File reading in browser
- **Secure Transmission**: Encrypted API calls
- **No Logging**: Chat content never logged
- **Session-Only**: No persistent user data

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
tests/
├── components/         # Component unit tests
├── pages/             # Page integration tests
├── utils/             # Utility function tests
└── api/               # API endpoint tests
```

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** with proper TypeScript types
4. **Add tests** for new functionality
5. **Run quality checks**: `npm run typecheck && npm test`
6. **Format code**: `npm run format.fix`
7. **Commit changes**: `git commit -m 'Add amazing feature'`
8. **Push branch**: `git push origin feature/amazing-feature`
9. **Open Pull Request**

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Enforced linting rules
- **Prettier**: Consistent code formatting
- **Naming**: camelCase for variables, PascalCase for components

### Component Guidelines

```typescript
// Component template
interface ComponentProps {
  title: string;
  optional?: boolean;
}

export function Component({ title, optional = false }: ComponentProps) {
  return (
    <div className="component-styles">
      <h1>{title}</h1>
      {optional && <p>Optional content</p>}
    </div>
  );
}
```

## 📋 Roadmap

### Current Features

- ✅ Multi-platform chat analysis
- ✅ AI-powered insights
- ✅ PDF/HTML export
- ✅ Responsive design
- ✅ Privacy-first architecture

### Planned Features

- 🔄 Real-time collaboration analysis
- 🔄 Historical trend tracking
- 🔄 Multi-language support
- 🔄 Advanced visualization charts
- 🔄 Batch processing capabilities
- 🔄 API rate limiting and optimization

## 🐛 Troubleshooting

### Common Issues

**API Key Errors:**

```
Error: Invalid API key
Solution: Verify key from Google AI Studio
```

**File Upload Failures:**

```
Error: File too large
Solution: Ensure files are under 50MB
```

**Analysis Timeouts:**

```
Error: Request timeout
Solution: Try smaller file or check internet connection
```

**JSON Parsing Errors:**

```
Error: Invalid JSON response
Solution: Check raw analysis in detailed section
```

### Debug Mode

Enable verbose logging:

```bash
DEBUG=true npm run dev
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for Gemini API access
- **Radix UI** for accessible components
- **TailwindCSS** for utility-first styling
- **React Team** for the amazing framework
- **Open Source Community** for invaluable libraries

## 📞 Support

- **Documentation**: [Help Center](/help-center)
- **FAQ**: [Frequently Asked Questions](/faq)
- **Contact**: [Contact Form](/contact)
- **Issues**: GitHub Issues tracker

---

<div align="center">
  <p>Made with ❤️ for understanding digital relationships</p>
  <p>© 2025 Relationship Analyzer. All rights reserved.</p>
</div>
