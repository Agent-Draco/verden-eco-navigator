## 2026-06-25 - Accessible Active Navigation Indicators
**Learning:** Navigation elements relying on dynamic visual styling (e.g., color, shadow) for active states need a semantic equivalent for screen readers.
**Action:** Always map active routes to `aria-current="page"` on the corresponding `<button>` or `<a>` tag, while standardizing keyboard accessibility with `focus-visible:ring`.
