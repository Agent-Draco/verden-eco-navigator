
## 2024-05-04 - Accessibility States for Framer Motion Custom Interactive Components

**Learning:** Custom interactive components wrapped with Framer Motion (like `GlassButton` extending `HTMLMotionProps`) do not automatically implement visually distinct native focus or disabled states simply by passing props.
**Action:** When working on custom interactive elements (buttons, inputs, links), ensure that native attributes inherited from HTML are fully supported visually via Tailwind's pseudo-classes. Specifically, explicitly set `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` and `disabled:opacity-50 disabled:pointer-events-none` on the base classes.
