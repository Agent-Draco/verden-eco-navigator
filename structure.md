# Structure.md (Root)

## Overview
This is the root directory of the Verden Eco-Navigator project. It contains project-wide configuration, environment settings, and basic project metadata.

## Subfolders
- **.github** - GitHub-related configurations and project documentation.
- **public** - Static assets (including 3D models and textures).
- **src** - The main application source code (React + TypeScript).
- **supabase** - Supabase configuration and temporary connection files.
- **dist** - Compiled production build (if generated).
- **.idx** - IDX workspace configurations.
- **.vscode** - VS Code project-specific settings.

## Files
- **package.json** - Node.js project manifest, defining dependencies and scripts.
- **vite.config.ts** - Vite build and development server configuration.
- **tailwind.config.ts** - Tailwind CSS configuration.
- **tsconfig.json**, **tsconfig.app.json**, **tsconfig.node.json** - TypeScript configurations.
- **index.html** - Main HTML entry point for the single-page application.
- **components.json** - Shadcn UI configuration.
- **.env** - Environment variables for API keys and connection strings.
- **README.md** - Project documentation and setup instructions.
- **.gitignore** - List of files and folders specifically ignored by Git.
- **eslint.config.js** - ESLint linting rules.
- **postcss.config.js** - PostCSS configuration for styling processors.
- **vitest.config.ts** - Vitest testing configuration.
- **playwright.config.ts** - Playwright e2e/integration testing configuration.
- **bun.lock**, **package-lock.json** - Dependency lock files for reproducible installs.
- **check.js** - Utility script for flow and reliability checking.
- **PRIVACY POLICY.txt**, **TERMS AND CONDITIONS.txt** - Project legal documents.
- **app_commands.md**, **run_commands.md**, **build_output.txt** - Implementation and build logs.
