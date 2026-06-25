## 2026-06-25 - Standardize Navigation Accessibility
**Learning:** Navigation components often lack basic keyboard focus indicators and semantic `aria-current` states even when visual active states are present.
**Action:** Always ensure `focus-visible` utility classes and `aria-current="page"` are applied to custom navigation elements to maintain screen-reader and keyboard accessibility.
