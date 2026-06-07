## 2025-03-05 - Enhance Sidebar Navigation Accessibility

**Learning:** Custom navigation buttons often lack keyboard focus indicators (`focus-visible`) and semantic state attributes (`aria-current="page"`), making them difficult for screen reader and keyboard-only users to navigate.
**Action:** Always apply explicit `focus-visible` rings and conditionally add `aria-current="page"` to active custom navigation links to ensure full accessibility without degrading the mouse user experience.
