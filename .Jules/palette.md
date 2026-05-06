
## 2024-05-06 - Explicit Focus and Disabled States on Custom Buttons

**Learning:** When using custom `motion.button` components or `div`-based interactives, inheriting standard HTML props isn't enough for robust accessibility. Native focus rings and explicit disabled states must be manually styled using Tailwind's `focus-visible:` and `disabled:` pseudo-classes to ensure visual clarity during keyboard navigation and state changes.
**Action:** Always include `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none` on custom UI components that act as primary interactives.
