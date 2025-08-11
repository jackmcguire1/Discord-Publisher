# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Discord Publisher is a React-based web application for creating and managing Discord messages with rich embeds, components, and webhook integrations. The application is built with Vite, TypeScript, and Tailwind CSS.

## Development Commands

```bash
# Install dependencies
yarn install

# Start development server (port 5173 by default)
yarn dev

# Build for production (outputs to docs/ directory)
yarn build

# Preview production build
yarn preview
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: Zustand with Immer for immutable updates and Zundo for undo/redo
- **Routing**: React Router v6
- **API Client**: React Query v3
- **Code Editor**: CodeMirror for JSON editing

### Project Structure

The application follows a feature-based architecture:

- **src/api/**: API layer with React Query integration
  - `client.ts`: Query client configuration
  - `mutations.ts`: API mutations
  - `queries.ts`: API queries
  - `wire.ts`: Wire protocol definitions

- **src/state/**: Zustand stores for global state
  - `message.ts`: Main message editor state with temporal (undo/redo) support
  - `attachments.ts`: File attachment management
  - `sendSettings.ts`: Webhook and sending configuration
  - `settings.ts`: User preferences and settings

- **src/discord/**: Discord-specific utilities
  - `schema.ts`: Zod schemas for Discord message validation
  - `cdn.ts`: Discord CDN URL handling
  - `markdown.js`: Discord markdown parser

- **src/views/**: Route-based view components
  - `editor/`: Main editor views (JSON, cURL, send message)
  - `tools/`: Utility tools (colored text, webhook info, embed links)

- **src/components/**: Reusable UI components
  - Editor components for message building
  - Discord message preview components
  - Form controls and modals

### Key Features

1. **Message Editor**: Rich editor for Discord messages with:
   - Content field with markdown support
   - Embed builder with multiple embeds
   - Component builder (buttons, select menus)
   - File attachments
   - Webhook customization (username, avatar)

2. **State Management**: 
   - Zustand stores with persist middleware for localStorage
   - Undo/redo functionality via Zundo
   - Debounced validation using Zod schemas

3. **Preview System**: Real-time Discord message preview with accurate rendering

4. **Import/Export**: Support for JSON and cURL formats

5. **Discord Activity SDK**: Optional integration for Discord activities

### API Proxy Configuration

Development server proxies `/api` and `/e` endpoints to `http://127.0.0.1:8080` for backend communication.

### Build Configuration

- TypeScript strict mode enabled
- Production builds to `docs/` directory for GitHub Pages deployment
- Base URL changes based on environment (production uses `/Discord-Publisher/`)
- Post-build script copies index.html to 404.html for SPA routing

### Important Patterns

1. **Lazy Loading**: Views are lazy-loaded using React.lazy() for code splitting
2. **Error Boundaries**: EditorErrorBoundary wraps the main editor for error handling
3. **Validation**: Real-time validation using Zod schemas with debouncing
4. **Component Architecture**: Heavy use of composition for editor components
5. **Custom Hooks**: State stores exposed via custom hooks (e.g., `useCurrentMessageStore`)