## 2024-05-24 - Missing Keyboard Focus States on Custom Interactive Elements
**Learning:** Custom components like `GlassButton` and sidebar navigation buttons omitted standard keyboard focus styles, reducing accessibility for keyboard users. Relying on custom hover or active states alone isn't enough.
**Action:** Ensure all interactive elements receive the standard Tailwind focus ring utility classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) during implementation to guarantee consistent keyboard navigation visibility.
