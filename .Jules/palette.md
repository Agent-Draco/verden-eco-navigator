## 2026-07-02 - Standardized Navigation Accessibility

**Learning:** Navigation components without semantic ARIA states like `aria-current="page"` and standard keyboard focus rings hinder screen-reader and keyboard usability, despite visual active states.
**Action:** Always ensure active routes utilize `aria-current="page"` and custom interactive elements implement standard Tailwind keyboard focus indicators (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
