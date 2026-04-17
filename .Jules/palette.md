## 2024-04-17 - Add keyboard focus states to GlassButton

**Learning:** Reusable components like div-based buttons or custom-styled HTML buttons often miss native focus states if not explicitly defined with Tailwind's `focus-visible` pseudo-class.
**Action:** Always check custom components for keyboard accessibility and add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` to ensure they are fully usable without a mouse.
