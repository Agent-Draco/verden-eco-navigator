
## 2026-07-05 - Standardized Accessibility for Interactive Elements
**Learning:** Custom interactive elements (BottomNav, SidebarNav, GlassButton) were missing semantic `aria-current` states and standard keyboard focus indicators.
**Action:** Applied `aria-current="page"` on active routes and standard Tailwind focus ring utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) to ensure robust screen-reader and keyboard accessibility without disrupting visual polish.
