## 2026-06-29 - Semantic ARIA and Focus States for Navigation
**Learning:** Navigation bars often visually indicate the active route but lack semantic `aria-current` attributes and clear focus outlines for keyboard users.
**Action:** Always pair visual active states with `aria-current="page"` and standard `focus-visible:ring-2` utilities on custom navigation components.
