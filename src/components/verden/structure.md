# Structure.md (src/components/verden)

## Overview
This directory contains custom-built components specific to the Verden Eco-Navigator features (mapping, navigation, and gamification).

## Files
- **AuthLayout.tsx** - Wrapper for authenticated pages (Sidebar/BottomNav).
- **AvatarSelector.tsx** - UI for selecting and unlocking player avatars.
- **BottomNav.tsx** - Mobile-first navigation layout (active on small screens).
- **GlassButton.tsx**, **GlassCard.tsx** - Styled components for the "glassmorphism" aesthetic.
- **GroupDecision.tsx** - Interface for group ride routing decisions.
- **LoadingScreen.tsx** - Application splash and state-loading screen.
- **Map.tsx** - The main 3D/2D interactive map based on MapLibre GL.
- **MapBackground.tsx** - Static or lightweight background map for non-nav pages.
- **RewardPopup.tsx** - Animated notification for earned credits/milestones.
- **Shell.tsx** - Responsive layout shell that manages sidebar/bottom-nav visibility.
- **SidebarNav.tsx** - Desktop-first vertical navigation layout.
- **SimulatedRideBooking.tsx** - Demo UI for vehicle search and booking.
- **Vehicle3D.tsx** - High-fidelity 3D vehicle renderer using React Three Fiber.
- **VerdenLogo.tsx** - SVG/PNG branded logo component with adaptive styling.
