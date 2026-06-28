## 2026-06-28 - Accessible Navigation Indicators

**Learning:** Navigation components often lack semantic state (`aria-current`) and visible keyboard focus, reducing usability for screen readers and keyboard users.
**Action:** Always ensure active routes utilize semantic ARIA states like `aria-current="page"` alongside visual active/focus indicators (`focus-visible` utility pattern) to maintain accessibility.
