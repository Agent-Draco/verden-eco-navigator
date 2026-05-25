## 2024-05-25 - Improve Navigation Accessibility

**Learning:** When building custom navigation bars in React using Tailwind, explicitly declaring `aria-current="page"` conditionally for the active route greatly improves screen-reader clarity. Also, when using generic styling for buttons, adding explicit `focus-visible` ring styling ensures keyboard accessibility without polluting the experience for mouse users.
**Action:** Always verify `aria-current` usage and explicitly define `focus-visible` styles rather than relying entirely on un-styled default outlines when designing custom UI navigation controls.
