
## 2024-05-24 - Keyboard Accessibility for Hover Tooltips

**Learning:** For custom tooltip-like labels relying on `group-hover:opacity-100`, they must be paired with `group-focus-visible:opacity-100` and the parent element needs explicit focus outlines to maintain full keyboard accessibility and visibility for screen navigators.
**Action:** Always add `focus-visible:ring-2 focus-visible:ring-ring group-focus-visible:opacity-100` when building custom CSS-based tooltips, and add `aria-hidden="true"` to decorative icons within accessible buttons.
