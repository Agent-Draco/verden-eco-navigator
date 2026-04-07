# Project Overview: Verden - Eco-Navigator

Verden is a sustainable navigation and mobility application designed to help users reduce their carbon footprint through eco-friendly routing and gamification.

## Main Entry Points
- **Home Dashboard**: Feed of community impact and user stats.
- **Navigation**: Search and route selection with eco-scoring.
- **EcoMoov**: Group challenges and rewards.
- **Garage/Customize**: 3D vehicle customization and avatar selection.

## Major Files
- `src/App.tsx`: App routing and global state providers.
- `src/contexts/AppContext.tsx`: Core application logic (credits, scores, unlocks).
- `src/components/verden/Map.tsx`: 3D map implementation using MapLibre.
- `src/components/verden/Vehicle3D.tsx`: 3D vehicle rendering with Three.js.

## Dependency Map
App → [AuthProvider, AppProvider] → Routes → Pages (Home, Navigation, Profile, etc.)
Pages → [Components, Hooks, Services]
Navigation → Map → MapLibre GL
EcoMoov → Supabase (DB/Auth)

## Navigation Guide
- **Code**: `src/` (Logic, UI, Styles)
- **Assets**: `public/` (3D Models, Textures, HDRI)
- **Backend**: `supabase/` (Migrations, Config)
- **Docs**: `.github/` (Changelogs, Project metadata)
