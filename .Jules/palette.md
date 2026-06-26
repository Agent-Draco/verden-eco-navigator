## 2026-06-26 - Standardize Navigation Accessibility

**Learning:** Navigation components often rely on visual cues for active states but miss semantic ARIA roles (`aria-current="page"`) and explicit keyboard focus indicators (`focus-visible`).
**Action:** Ensure all custom navigation elements across repositories implement `aria-current` for active routes and standard `focus-visible:ring` classes for keyboard users.
