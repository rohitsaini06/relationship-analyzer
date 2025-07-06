# Project: Relationship Analyzer

## Overview

This project is a sophisticated AI-powered web application designed to analyze digital conversations and provide deep insights into relationship dynamics, communication patterns, and emotional undertones. The application is already deployed and accessible at [https://relationship-analyzer.onrender.com/](https://relationship-analyzer.onrender.com/).

## Key Features

- **AI-Powered Analysis**: Leverages Google's Gemini API for advanced natural language processing.
- **Multi-Platform Support**: Compatible with chat exports from WhatsApp, Telegram, iMessage, Facebook Messenger, and more.
- **Privacy-First Design**: Ensures user privacy with end-to-end encryption, no data storage, and the use of user-provided API keys.
- **Comprehensive Reports**: Generates detailed reports across 8 analysis dimensions.
- **Export Options**: Allows users to export reports in HTML and PDF formats.
- **Modern UI**: Features a responsive and intuitive user interface built with TailwindCSS and Radix UI components.
- **Real-Time Processing**: Provides live progress tracking during the analysis.
- **Full-Stack Solution**: An integrated system with a React frontend and an Express.js backend.

## Tech Stack

### Frontend

- **React 18.3.1**: Powers the user interface with modern hooks and functional components.
- **TypeScript 5.5.3**: Ensures type safety and enhances developer experience.
- **Vite 6.2.2**: A fast build tool and development server.
- **TailwindCSS 3.4.11**: A utility-first CSS framework for styling.
- **Radix UI**: A library of accessible and unstyled UI components.
- **React Router 6.26.2**: Handles client-side routing.

### Backend

- **Express 4.18.2**: A minimal and flexible Node.js web application framework.
- **Node.js 16+**: The JavaScript runtime environment.
- **TypeScript**: Used for type-safe backend development.
- **Zod 3.23.8**: A TypeScript-first schema declaration and validation library.

### AI & APIs

- **Google Gemini API**: The core AI service for analyzing conversations.
- **Gemini 1.5 Flash**: The specific model used for its speed and efficiency.

### UI Components & Icons

- **Lucide React**: A library of beautiful and consistent icons.
- **Framer Motion**: Used for creating fluid animations.
- **Sonner**: A library for displaying toast notifications.
- **Class Variance Authority**: A tool for creating flexible and reusable component variants.

## Project Structure

The project is organized into the following main directories:

- `client/`: Contains the React frontend application.
  - `components/ui/`: Houses over 40 reusable UI components.
  - `pages/`: Includes components for each route, such as the homepage, results page, and FAQ.
  - `hooks/`: Contains custom React hooks.
  - `lib/`: Holds utility functions.
  - `App.tsx`: The main application component with routing logic.
  - `global.css`: Defines global styles and themes.
- `server/`: The Express backend.
  - `routes/`: Defines API route handlers, including the main analysis endpoint.
  - `index.ts`: The server configuration file.
- `shared/`: Contains shared types and interfaces, such as API type definitions.
- `public/`: Stores static assets like images and icons.
- `package.json`: Lists all project dependencies and scripts.
- `tailwind.config.ts`: The configuration file for TailwindCSS.
- `tsconfig.json`: The configuration file for TypeScript.
- `vite.config.ts`: The configuration file for Vite.

## Hosted URL

The website is already hosted and can be accessed at the following URL:
[https://relationship-analyzer.onrender.com/](https://relationship-analyzer.onrender.com/)
