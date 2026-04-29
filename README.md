<div align="center">

<br />

<img src="public/explainit.png" alt="ExplainIt" width="100" />

<br />
<br />

# ExplainIt

### Transform Complex Jargon into Simple Language

<br />

[![Live Demo](https://img.shields.io/badge/Live_Demo-explainit.netlify.app-6366f1?style=for-the-badge&logo=netlify&logoColor=white)](https://explainit.netlify.app)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Stars](https://img.shields.io/github/stars/StellarStacker/Explain-it?style=for-the-badge&logo=github&logoColor=white&color=f59e0b)](https://github.com/StellarStacker/Explain-it/stargazers)
[![Issues](https://img.shields.io/github/issues/StellarStacker/Explain-it?style=for-the-badge&logo=github&logoColor=white&color=ef4444)](https://github.com/StellarStacker/Explain-it/issues)
[![Forks](https://img.shields.io/github/forks/StellarStacker/Explain-it?style=for-the-badge&logo=github&logoColor=white&color=06b6d4)](https://github.com/StellarStacker/Explain-it/network/members)

<br />

**ExplainIt** is an open-source AI-powered web application that transforms dense technical jargon,
academic terminology, and industry-specific language into clear, beginner-friendly explanations.
Built with React, Spring Boot, and Google Gemini AI.

<br />

[Get Started](#-quick-start) &nbsp;&bull;&nbsp; [View Demo](https://explainit.netlify.app) &nbsp;&bull;&nbsp; [Report Bug](https://github.com/StellarStacker/Explain-it/issues/new?labels=bug&template=bug_report.md) &nbsp;&bull;&nbsp; [Request Feature](https://github.com/StellarStacker/Explain-it/issues/new?labels=enhancement&template=feature_request.md)

<br />

---

</div>

<br />

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Issue Reporting](#-issue-reporting)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Acknowledgments](#acknowledgments)

<br />

## About the Project

ExplainIt addresses a universal problem: complex text that blocks understanding. Whether you are a student encountering academic papers, a professional navigating legal contracts, a developer reading unfamiliar documentation, or a researcher parsing dense scientific literature, ExplainIt provides instant clarity.

The application sends your input to Google's Gemini AI, which analyzes context, identifies jargon, and returns structured explanations that break down each term into plain language with relatable analogies.

### Example

**Input:**

> "The implementation leverages a microservices architecture with containerized deployments orchestrated through Kubernetes, utilizing asynchronous message queuing patterns for inter-service communication."

**Output:**

> Think of this like building with LEGO blocks instead of one giant piece:
>
> - **Microservices architecture** = Building separate small programs that each do one job well
> - **Containerized deployments** = Each program lives in its own protective box so they don't interfere with each other
> - **Kubernetes** = A smart manager that automatically handles all these boxes
> - **Asynchronous message queuing** = The programs leave messages for each other, like notes in mailboxes

<br />

## Features

| Category | Feature | Description |
|:---------|:--------|:------------|
| **Core** | AI-Powered Simplification | Gemini AI analyzes context and produces structured, beginner-friendly breakdowns |
| **Core** | Smart Fallbacks | Automatic failover across multiple Gemini model variants |
| **Core** | Text-to-Speech | Built-in voice synthesis to listen to explanations |
| **Core** | One-Click Copy | Copy explanations to clipboard instantly |
| **Interface** | Glassmorphism UI | Modern frosted-glass aesthetic with depth and transparency |
| **Interface** | Dark / Light Mode | Full theme support with system preference detection |
| **Interface** | GPU-Accelerated Animations | Smooth 60fps particle systems, transitions, and micro-interactions |
| **Interface** | Fully Responsive | Optimized layouts for desktop, tablet, and mobile |
| **Auth** | Google OAuth | Secure authentication via Google sign-in |
| **Auth** | Email Verification | Account verification flow with email confirmation |
| **Platform** | Docker Support | Multi-stage Dockerfile for containerized deployments |
| **Platform** | Netlify Ready | Pre-configured `netlify.toml` with SPA redirect rules |

<br />

## Architecture

```
Client (React + Vite)          Backend (Spring Boot)          External
+-----------------------+      +----------------------+      +------------------+
|                       |      |                      |      |                  |
|  Landing Page         |      |  REST API            |      |  Google Gemini   |
|  Authentication       +----->+  Auth Service        +----->+  AI Models       |
|  Explainer UI         |      |  Explainer Service   |      |                  |
|  Theme Engine         |      |  User Management     |      |  Google OAuth    |
|                       |      |                      |      |                  |
+-----------------------+      +----------------------+      +------------------+
```

The frontend is a single-page application built with React 18 and Vite. It communicates with a Spring Boot backend via Axios. The backend handles authentication, user management, and proxies requests to the Google Gemini API for text simplification.

State management is handled by Zustand, routing by React Router v7, and styling by Tailwind CSS with custom glassmorphism extensions.

<br />

## Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| **Frontend** | ![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black) | Component architecture and UI rendering |
| **Frontend** | ![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tooling, HMR, and optimized bundling |
| **Frontend** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS_3-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white) | Utility-first styling with custom design tokens |
| **Frontend** | ![Zustand](https://img.shields.io/badge/Zustand_5-F59E0B?style=flat-square&logo=react&logoColor=white) | Lightweight global state management |
| **Backend** | ![Spring Boot](https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=flat-square&logo=springboot&logoColor=white) | REST API, auth, and business logic |
| **AI** | ![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white) | Large language model for text simplification |
| **Auth** | ![Google OAuth](https://img.shields.io/badge/Google_OAuth_2.0-EA4335?style=flat-square&logo=google&logoColor=white) | Secure third-party authentication |
| **Infra** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerized deployment |
| **Infra** | ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) | Frontend hosting and CDN |

</div>

<br />

## &#x1F680; Quick Start

### Prerequisites

| Requirement | Version | Installation |
|:------------|:--------|:-------------|
| Node.js | 18 or higher | [nodejs.org](https://nodejs.org) |
| npm | 9 or higher | Included with Node.js |
| Gemini API Key | -- | [Google AI Studio](https://makersuite.google.com/app/apikey) |

### Installation

```bash
# Clone the repository
git clone https://github.com/StellarStacker/Explain-it.git
cd Explain-it

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_APP_NAME=ExplainIt
VITE_MAX_INPUT_LENGTH=5000
```

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
# Build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

<br />

## &#x2699; Configuration

### Environment Variables

| Variable | Required | Default | Description |
|:---------|:---------|:--------|:------------|
| `VITE_GEMINI_API_KEY` | Yes | -- | Google Gemini API key for AI processing |
| `VITE_APP_NAME` | No | `ExplainIt` | Application display name |
| `VITE_MAX_INPUT_LENGTH` | No | `5000` | Maximum character count for input text |

### Customization Points

| Area | File | What You Can Change |
|:-----|:-----|:--------------------|
| Colors and Theme | `tailwind.config.js` | Custom color palettes, fonts, animation timings |
| Animations | `src/style.css`, `src/pages/LandingPage.css` | Keyframes, durations, easing functions |
| AI Models | `src/api.js` | Gemini model variants and fallback order |
| Components | `src/components/` | UI elements, layouts, interaction patterns |

<br />

## &#x1F4C1; Project Structure

```
Explain-it/
|
|-- public/                    # Static assets (logo, favicon)
|-- src/
|   |-- components/            # Reusable UI components
|   |   |-- BackgroundEffects  # GPU-accelerated particle system
|   |   |-- InputSection       # Text input with validation
|   |   |-- OutputSection      # Rendered AI response with copy/TTS
|   |   |-- Header             # App header with branding
|   |   |-- Footer             # App footer
|   |   |-- LoadingSection     # Processing state animations
|   |   |-- ErrorSection       # Error handling display
|   |   +-- SuccessModal       # Confirmation dialogs
|   |
|   |-- pages/
|   |   |-- landing/           # Public landing page
|   |   |   |-- LandingPage    # Page orchestrator with scroll reveals
|   |   |   |-- LandingNav     # Fixed navbar with scroll effects
|   |   |   |-- HeroSection    # Hero with gradient heading and CTAs
|   |   |   |-- FeaturesSection# Feature cards grid
|   |   |   |-- HowItWorksSection # Step-by-step workflow
|   |   |   |-- DemoSection    # Interactive before/after preview
|   |   |   |-- StarSection    # GitHub star call-to-action
|   |   |   |-- StarToast      # Recurring social proof notification
|   |   |   +-- BottomSections # Tech stack, CTA, and footer
|   |   |
|   |   |-- AppLayout          # Authenticated app shell
|   |   |-- Login              # Login page with Google OAuth
|   |   |-- Register           # Registration page
|   |   +-- EmailVerification  # Email confirmation flow
|   |
|   |-- hooks/
|   |   |-- useExplainer       # AI processing logic
|   |   |-- useTheme           # Dark/light mode management
|   |   +-- usePortal          # Portal rendering utility
|   |
|   |-- store/
|   |   +-- authStore          # Zustand authentication state
|   |
|   |-- services/
|   |   +-- authService        # Auth API client
|   |
|   |-- router/                # React Router configuration
|   |-- api.js                 # Gemini API integration
|   |-- config.js              # App configuration constants
|   |-- style.css              # Global styles and design system
|   +-- main.jsx               # Application entry point
|
|-- dockerfile                 # Multi-stage Docker build
|-- netlify.toml               # Netlify deployment config
|-- tailwind.config.js         # Tailwind + custom design tokens
|-- vite.config.js             # Vite build configuration
+-- package.json               # Dependencies and scripts
```

<br />

## &#x1F310; Deployment

### Netlify (Recommended)

The repository includes a pre-configured `netlify.toml`. Deploy in three steps:

```bash
# Install the Netlify CLI
npm install -g netlify-cli

# Authenticate
netlify login

# Build and deploy to production
npm run build
netlify deploy --prod
```

Then add your environment variables in the Netlify dashboard under **Site Settings > Environment Variables**.

### Docker

```bash
# Build the container
docker build -t explainit .

# Run on port 8080
docker run -p 8080:80 explainit
```

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

<br />

## &#x1F91D; Contributing

Contributions are what make the open-source community an incredible place to learn, inspire, and create. **Any contributions you make are greatly appreciated.**

We welcome all forms of contribution: code, documentation, bug reports, feature suggestions, and design improvements.

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/your-username/Explain-it.git
   cd Explain-it
   ```
3. **Create a branch** for your work
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following the code standards below
5. **Test** your changes locally
   ```bash
   npm run dev
   npm run build
   ```
6. **Commit** with a descriptive message
   ```bash
   git commit -m "feat: add your feature description"
   ```
7. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request** against the `main` branch

### Code Standards

| Practice | Guideline |
|:---------|:----------|
| Commits | Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `refactor:`) |
| Naming | Descriptive variable and function names; avoid abbreviations |
| Components | One component per file; keep components focused and reusable |
| Styling | Use Tailwind utilities; extend `tailwind.config.js` for custom tokens |
| Comments | Document complex logic; avoid obvious comments |

### Types of Contributions We Welcome

- **Bug Fixes** -- Found something broken? Fix it and open a PR.
- **New Features** -- Have an idea? Check the [roadmap](#-roadmap) or propose your own.
- **Documentation** -- Improve guides, add examples, fix typos.
- **Design** -- Enhance UI/UX, animations, or accessibility.
- **Performance** -- Optimize bundle size, rendering, or API calls.
- **Testing** -- Add unit tests, integration tests, or E2E coverage.
- **Translations** -- Help make ExplainIt available in more languages.

<br />

## &#x1F4E2; Issue Reporting

We use GitHub Issues to track bugs, feature requests, and discussions. Your feedback is essential for improving ExplainIt.

### Reporting a Bug

Before filing a bug report, please:

1. **Search existing issues** to avoid duplicates
2. **Reproduce the issue** and note the exact steps
3. **Include environment details** (browser, OS, Node version)

[Open a Bug Report](https://github.com/StellarStacker/Explain-it/issues/new?labels=bug&template=bug_report.md)

### Requesting a Feature

We actively review feature requests. Please:

1. **Describe the problem** the feature would solve
2. **Propose a solution** if you have one in mind
3. **Provide context** on why this would benefit other users

[Request a Feature](https://github.com/StellarStacker/Explain-it/issues/new?labels=enhancement&template=feature_request.md)

### Discussions

Have a question, idea, or want to connect with other contributors?

[Join Discussions](https://github.com/StellarStacker/Explain-it/discussions)

<br />

## &#x1F5FA; Roadmap

The following features are planned or under consideration. Contributions toward any of these are welcome.

| Status | Feature | Description |
|:-------|:--------|:------------|
| Planned | Multi-Language Support | Process and explain text in 50+ languages |
| Planned | PDF Upload | Extract text from uploaded PDFs for simplification |
| Planned | Browser Extension | Right-click to explain text on any website |
| Planned | Public API | RESTful endpoints for third-party integrations |
| Planned | Collaborative Workspaces | Share and annotate explanations with teams |
| Planned | Usage Analytics | Dashboard with processing statistics and insights |
| Future | Offline Mode | Local model support for air-gapped environments |
| Future | LMS Integration | Connect with learning management platforms |
| Future | Enterprise Edition | Multi-tenant deployment with SSO and audit logging |

<br />

## &#x1F4C4; License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software. See the [LICENSE](LICENSE) file for full terms.

```
MIT License -- Copyright (c) 2026 Minus One Enterprise
```

<br />

## Acknowledgments

- [Google AI](https://ai.google.dev/) -- Gemini API powering the core simplification engine
- [React](https://react.dev/) -- Component architecture and rendering
- [Vite](https://vitejs.dev/) -- Next-generation frontend build tooling
- [Tailwind CSS](https://tailwindcss.com/) -- Utility-first CSS framework
- [Spring Boot](https://spring.io/projects/spring-boot) -- Backend framework
- [Zustand](https://zustand-demo.pmnd.rs/) -- Minimal state management
- [Netlify](https://netlify.com/) -- Frontend hosting and deployment
- The open-source community for continued inspiration and support

<br />

---

<div align="center">

<br />

**If ExplainIt has been useful to you, consider giving it a star. It helps others discover the project.**

<br />

[![Star on GitHub](https://img.shields.io/github/stars/StellarStacker/Explain-it?style=for-the-badge&logo=github&logoColor=white&label=Star&color=f59e0b)](https://github.com/StellarStacker/Explain-it)
&nbsp;&nbsp;
[![Fork on GitHub](https://img.shields.io/github/forks/StellarStacker/Explain-it?style=for-the-badge&logo=github&logoColor=white&label=Fork&color=6366f1)](https://github.com/StellarStacker/Explain-it/fork)
&nbsp;&nbsp;
[![Report Issue](https://img.shields.io/badge/Report_Issue-GitHub-ef4444?style=for-the-badge&logo=github&logoColor=white)](https://github.com/StellarStacker/Explain-it/issues)

<br />
<br />

Built and maintained by **[Minus One Enterprise](https://github.com/Minus-one-enterprise)**

Licensed under [MIT](LICENSE)

<br />

[Back to Top](#explainit)

</div>
