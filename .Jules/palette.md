## 2026-06-25 - Standardized Active Navigation Accessibility

**Learning:** Navigation elements lacking `aria-current="page"` reduce screen-reader context, and omitting standard keyboard focus rings harms navigability for custom components.
**Action:** Always pair visual active states with `aria-current` and implement standard `focus-visible` utility classes for interactive elements.
