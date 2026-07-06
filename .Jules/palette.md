
## 2026-07-05 - Add focus-visible to custom buttons
**Learning:** Custom interactive components like `GlassButton` often miss default focus states, making keyboard navigation difficult. Standardizing focus indicators improves accessibility across the app.
**Action:** Always add standard Tailwind `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` to custom interactive elements.
