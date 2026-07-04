## 2025-02-23 - Standardizing Navigation Accessibility

**Learning:** Custom interactive elements (like Sidebars, BottomNavs, and GlassButtons) often rely on visual cues but lack semantic states and focus outlines, alienating keyboard and screen-reader users.
**Action:** Always ensure active routes utilize semantic ARIA states like aria-current="page" and implement standard keyboard focus indicators using the Tailwind utility pattern focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2.
