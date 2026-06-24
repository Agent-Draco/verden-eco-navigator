## 2026-06-24 - Semantic ARIA and Focus Visibility in Navigation

**Learning:** Navigation components often rely solely on visual indicators (like color) for active states and miss standard keyboard focus outlines. This breaks screen-reader accessibility and keyboard navigation flow.
**Action:** Always ensure active routes utilize semantic ARIA states like `aria-current="page"` alongside standard Tailwind `focus-visible` utility patterns.
