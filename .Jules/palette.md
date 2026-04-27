## 2024-04-28 - Added focus-visible to GlassButton

**Learning:** When styling complex custom interactive elements with Tailwind, `focus-visible` is crucial for keyboard navigation visibility without breaking mouse-based click aesthetics.
**Action:** Always verify custom components have `focus-visible` utility classes and avoid replacing arbitrary classes like `transition-liquid` unnecessarily unless it breaks tests, as keeping the changes scoped to the UX task is preferred.
