## 2026-06-30 - Semantic ARIA and Focus States for Navigation

**Learning:** Global navigation components lacking explicit `aria-current` attributes and visible focus rings limit usability for keyboard and screen-reader users, even when visually distinct active states exist.
**Action:** Standardized navigation elements (Sidebar, BottomNav) by adding `aria-current="page"` on active routes and universal `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` Tailwind utility patterns across interactive buttons.
