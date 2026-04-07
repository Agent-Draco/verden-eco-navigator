# Structure.md (src)

## Overview
This is the primary source directory for the Verden React application. It contains the application's logic, UI components, state management, and assets.

## Subfolders
- **assets** - Image assets for logo and branding.
- **components** - Reusable React components (UI primitives and feature-specific).
- **contexts** - React Context providers for global state (Auth, App).
- **hooks** - Custom React hooks for shared logic.
- **lib** - Utility functions and helpers.
- **pages** - Top-level page components mapped to routes.
- **services** - External API clients (Supabase, OSRM, Photon, etc.).
- **test** - Unit and integration testing setup.

## Files
- **main.tsx** - Production entry point that renders the React tree.
- **App.tsx** - Root component defining routes and wrapping them in state providers.
- **index.css** - Global Tailwind CSS stylesheet and design system variables.
- **App.css** - Application-wide style overrides.
- **vite-env.d.ts** - TypeScript environment definitions for Vite.
