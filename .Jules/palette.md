## 2023-10-27 - Bottom Navigation Accessibility

**Learning:** Bottom navigation items often lack `aria-current` to communicate the active tab to screen readers, and often lack explicit focus rings for keyboard users when custom styling is applied.
**Action:** Added `aria-current="page"` for the active route and standard `focus-visible` utility classes for keyboard focus visibility.
