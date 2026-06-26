## 2026-06-26 - Standardize Navigation Accessibility
**Learning:** Navigation elements consistently lacked semantic ARIA states (like `aria-current`) and keyboard focus visibility, harming screen reader and keyboard-only usability.
**Action:** Applied standard `aria-current="page"` logic and Tailwind `focus-visible:ring` patterns to all global nav components to ensure inclusive traversal.
