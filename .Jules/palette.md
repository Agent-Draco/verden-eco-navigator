## 2024-05-18 - Improve Sidebar Navigation Accessibility

**Learning:** Navigation buttons relying solely on `group-hover` for tooltip visibility obscure context for keyboard users, and missing `aria-current` attributes hide structural state from screen readers.
**Action:** Always pair `group-hover` with `group-focus-visible` for tooltips, apply explicit `focus-visible` outlines, and use `aria-current="page"` alongside `aria-hidden="true"` on decorative icons for complete accessibility.
