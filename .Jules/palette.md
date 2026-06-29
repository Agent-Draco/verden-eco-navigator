## 2026-06-29 - Semantic Navigation Accessibility
**Learning:** Custom navigation components (like Sidebars) often rely on visual active indicators but lack semantic `aria-current` and keyboard focus states, breaking screen-reader accessibility.
**Action:** Standardize navigation components to always include `aria-current="page"` for active routes and `focus-visible` utility classes for clear keyboard navigation.
