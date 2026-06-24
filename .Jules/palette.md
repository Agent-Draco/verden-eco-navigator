## 2026-06-24 - Standardize Navigation Component Accessibility

**Learning:** Custom interactive elements (like GlassButton, BottomNav, and SidebarNav) often overlook standard semantic indicators (like aria-current) and standard keyboard focus states.
**Action:** Always ensure active routes utilize semantic ARIA states like aria-current="page" alongside visual active/focus indicators to maintain screen-reader and keyboard accessibility consistency.
