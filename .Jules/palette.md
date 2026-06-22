## 2024-05-24 - Standardized Keyboard Navigation & ARIA Focus
**Learning:** Custom interactive elements (like Sidebars and BottomNavs) often lack native focus states and semantic active states (`aria-current`), which degrades keyboard and screen-reader accessibility.
**Action:** Applied `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` across interactive components and added `aria-current={active ? "page" : undefined}` to active routes to ensure screen-reader clarity.
