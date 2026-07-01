## 2026-07-01 - Standardized Accessible Navigation
**Learning:** Navigation components often miss semantic ARIA states (`aria-current`) even when visually indicating active states. Custom interactive elements frequently lack standard keyboard focus indicators.
**Action:** Always ensure active routes utilize semantic ARIA states like `aria-current="page"` alongside visual active/focus indicators (`focus-visible`) to maintain screen-reader and keyboard accessibility.
