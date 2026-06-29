## 2026-06-29 - Standardize Navigation Accessibility
**Learning:** Navigation components often rely on visual active states without communicating 'current page' status to screen readers, and custom buttons frequently lack keyboard focus indicators.
**Action:** Always include `aria-current="page"` on active routes and standardized `focus-visible:ring-2` utility classes for interactive elements to ensure accessibility.
