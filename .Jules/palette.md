
## 2024-05-04 - Explicit Focus and Disabled States for Custom Wrappers

**Learning:** When using custom wrapper components (e.g. div-based or framer-motion wrapped buttons like `GlassButton`), standard HTML states like focus and disabled are often lost visually even if technically present in HTML.
**Action:** Always explicitly define native focus states using `focus-visible` pseudo-classes (e.g., `focus-visible:ring-primary focus-visible:ring-offset-background`) and disabled states (`disabled:opacity-50 disabled:pointer-events-none`) for custom interactive elements to meet basic accessibility standards.
