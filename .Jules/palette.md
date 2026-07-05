## 2025-03-05 - Standardize Component Accessibility
**Learning:** Navigation and custom button components frequently lack semantic state (`aria-current`) and visible keyboard focus, which violate accessibility guidelines.
**Action:** Always implement `aria-current="page"` for active navigation items and apply explicit `focus-visible` utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) to all interactive elements to ensure consistent, screen-reader-friendly keyboard navigation.
