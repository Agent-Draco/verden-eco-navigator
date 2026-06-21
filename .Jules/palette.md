## 2026-06-21 - Standardize Navigation Accessibility

**Learning:** Navigation components often lack semantic `aria-current` states and visible keyboard focus, making them less accessible for screen readers and keyboard users.
**Action:** Always ensure active routes utilize `aria-current="page"` and that custom interactive elements implement standard Tailwind `focus-visible` styling.
