# CodeInspector Landing Page

## Project Overview
This is a React frontend application built with Vite, TypeScript, and Tailwind CSS. It's an AI code detection and humanization platform featuring:
- Modern UI with shadcn/ui components
- AI code detection and humanization features
- Responsive design with dark/light mode support
- Landing page with features and testimonials sections
- 3D Spline model integration

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + shadcn/ui components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM

## Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── code-auth/       # Code authentication related components
│   ├── features/        # Feature showcase components
│   ├── pricing/         # Pricing section components
│   └── ui/              # shadcn/ui components
├── pages/               # Page components
│   ├── Index.tsx        # Landing page
│   └── CodeAuthenticator.tsx  # Code authentication page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── config/              # Configuration files
```

## Configuration
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows Replit proxy)
- **Build**: Vite production build
- **Deployment**: Configured for autoscale deployment

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production preview server
- `npm run lint` - Run ESLint

## Recent Changes
- **2025-09-27**: Initial Replit setup
  - Configured Vite to use port 5000 with host 0.0.0.0
  - Added production start script
  - Set up deployment configuration for autoscale
  - Verified build process works correctly
- **2025-09-27**: Complete transformation to CodeInspector
  - Removed pricing section from landing page
  - Changed all "traders" references to "coders" 
  - Updated branding from "CodeAuthenticator" to "CodeInspector"
  - Replaced hero image with 3D Spline model integration
  - Updated footer and testimonials content
  - Preserved all animations and styling

## Replit Environment
- Workflow configured for frontend on port 5000
- Deployment ready for autoscale target
- Build and preview working correctly