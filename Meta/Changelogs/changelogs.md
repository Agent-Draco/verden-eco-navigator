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
- [LG-002] (2026-04-09): Background Visibility & Settings Revert - Boosted topographic/abstract pattern visibility in `index.css`. Reverted Profile menu and settings-related pages (Login, Signup, Customize, Vehicle Setup, Legal) to their original clean state as per user request.
- [LG-003] (2026-04-09): Navigation & UI Overhaul - Implemented full-screen Search Overlay to declutter map view, expanded search result limits (20), and added auto-hiding navbar logic. Fixed navigation bugs (missing car token, inactive buttons), improved EcoMoov calendar with dynamic date logic, and populated badges in AppContext. Integrated new Membership and Settings pages.
- [NAV-001] (2026-04-.ipynb): 3D Vehicle Rendering Fix - Rewrote `VehicleEntityController.ts` to use `VelocityOrientationProperty` (auto-aligns model heading to GPS velocity), `HeightReference.CLAMP_TO_GROUND` (terrain alignment), `LinearApproximation` interpolation, and twin-sample bootstrap to prevent invisible first-frame. Camera controller reworked with ENU look-ahead offset so the road ahead is visible, plus speed-adaptive pitch/distance. Fixed missing `Search` icon import in `Navigation.tsx`.
- [NAV-002] (2026-04-08): Navigation Label Ranking - Created `src/lib/navLabelRanker.ts`, a resolver that enforces priority order `shop > building > area > city > highway` for navigation instruction labels. Wired into `Navigation.tsx` via `formatInstruction()`, replacing the old inline `parseInstruction` function.
- [BLD-001] (2026-04-08): Build fixes in `Home.tsx` and `index.css` — fixed unclosed `<motion.div>` closing tag mismatch on line 200, missing `)}` on the suggestions conditional block, template literal keys in JSX (`key={...}` → string concatenation), and invalid `@apply ease-[...]` arbitrary-value in `index.css` replaced with plain CSS. Build now succeeds cleanly.
- [NAV-003] (2026-04-09): Advanced Cesium Navigation Stabilization - Major architectural refactor of the follow-camera and vehicle transform pipeline. Implemented hybrid velocity-smoothing logic (LERP @ 0.15), predictive camera foresight, and Unity-to-Cesium frame alignment via nodeTransformations. Added high-fidelity 3D route rendering with manual terrain sampling, PolylineGlowMaterial, and depthFaceMaterial for "x-ray" visibility through terrain. Implemented robust listener cleanup for React lifecycle safety.
- [NAV-004] (2026-04-09): UI Polishing & Polyline Fixes - Restored navbar visibility on the home map by syncing state with the search overlay. Refactored Cesium route polyline rendering with increased vertical offset (0.5m) and simplified depthFailMaterial to ensure hardware compatibility and prevent z-fighting. Aligned /navigation-dev route with production navbar exclusion rules.
- [CSS-002] (2026-04-09): Global Scroll Restoration - Resolved "unable to scroll" issue by refactoring `Shell.tsx` and `index.css` to remove restrictive `overflow-hidden` rules on main layout containers. Cleaned up redundant `overflow-y-auto` and `h-full` constraints across `Customize`, `Credits`, `Membership`, `Profile`, `Settings`, and `EcoMoov` pages to provide a unified, smooth scrolling experience.

## 2.0.1 (Stable Release 2)
- [FIX-001] (2026-04-09): Fixed ReferenceError: `cn` is not defined in `EcoMoov.tsx` - Added the missing utility import.
- [FIX-002] (2026-04-09): Fixed `Settings.tsx` errors - Corrected sign-out function name to `logout` and implemented literal ARIA `aria-checked` values via conditional rendering for strict compliance.

## 2.0.2 (Stable Release 3)
- [FIX-003] (2026-04-09): Fixed "Maximum update depth exceeded" error in `Home.tsx` by removing `setNavHidden` from the `useEffect` dependency array.
- [FIX-004] (2026-04-09): Fixed GLB model rendering in `VehicleEntityController.ts` by applying a `headingPitchRollQuaternion` to correctly align the model with Cesium's reference frame.
- [FIX-005] (2026-04-09): Resolved TypeScript errors in `VehicleEntityController.ts` by correctly instantiating `TranslationRotationScale` for `nodeTransformations`, ensuring type compatibility with CesiumJS.
- [META-001] (2026-04-09): Instructions Documentation Overhaul - Refactored `Meta/Instructions.md` for improved clarity, formatting, and structural organization.
- [DOC-001] (2026-04-09): Project README Overhaul - Replaced placeholder with a comprehensive, professionally formatted `README.md`.

## Version 2.0.3 (Exhibition Page)
