## 2024-05-18 - Sidebar Navigation Accessibility

**Learning:** For custom tooltip-like labels relying on `group-hover:opacity-100`, they must be paired with `group-focus-visible:opacity-100`. Additionally, the parent interactive element needs `focus-visible` outline styles and `aria-current="page"` to maintain full keyboard accessibility and visibility for screen navigators.
**Action:** Always add `group-focus-visible` alongside `group-hover` for custom tooltips, and add `aria-current="page"` for active navigation links.
