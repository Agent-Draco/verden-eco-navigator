
## 2026-06-23 - Standardize Navigation Accessibility
**Learning:** Active routes in custom navigation components lacked semantic ARIA states and keyboard focus indicators, impairing accessibility.
**Action:** Always ensure active routes utilize `aria-current="page"` alongside standard `focus-visible` utility classes for clear visual keyboard tracking.
