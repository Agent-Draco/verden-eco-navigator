# ChangeLogs
## 1.0.0 (Alpha)
- [AA1] (2026-04-07): Project Structurization - Comprehensive documentation of project architecture, dependencies, and directory structures.

## 1.0.1 (Stable Release 1)
- [AB1] (2026-04-07): Dependency Verification - Confirmed presence of @react-three/fiber in package.json and node_modules.

## 2.0.0 (Beta)
- [AC1] (2026-04-07): CesiumJS Navigation Integration - Replaced MapLibre with CesiumJS as the primary 3D renderer for Navigation Mode. Implemented custom `VehicleEntityController` for GLB rendering and continuous GPS interpolation, along with `NavigationCameraController` for dynamic Google Maps-style follow camera constraints.
- [AD1] (2026-04-08): Fixed missing import errors for `Plus` and `cn` in `EcoMoovGroup.tsx`.
- [AE1] (2026-04-08): Accessibility & Style Fixes - Added `aria-label` to buttons in AvatarSelector, SidebarNav, Navigation, and Policy pages. Refactored inline styles to Tailwind and CSS in Map.tsx and AvatarSelector.tsx.
- [LG-001] (2026-04-08): Liquid Glass UI Overhaul - Implemented a premium, high-fidelity design system featuring high-refraction glass utilities, specialized topographic/abstract backgrounds, and a morphing button animation lifecycle.
- [CSS-001] (2026-04-08): Fixed CSS syntax errors and enhanced cross-browser mask compatibility in `index.css`.