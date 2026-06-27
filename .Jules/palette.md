
## 2026-06-27 - Consistent Semantic Navigation & Focus Accessibility
**Learning:** Core navigation elements (SidebarNav and BottomNav) were missing semantic `aria-current="page"` indicators for screen readers on active routes, and lacked visible keyboard focus rings across all icon-only interactions.
**Action:** Always apply `aria-current="page"` alongside visual active states in routers, and ensure all custom navigation buttons include standard `focus-visible:ring` utilities for keyboard usability.
