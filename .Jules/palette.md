## 2026-05-24 - Improve Nav Components Keyboard Accessibility
**Learning:** In Framer Motion or interactive components, `focus-visible` requires explicit classes like `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary` to ensure keyboard usability without displaying visual rings for mouse users, and dynamic `aria-current` must conditionally omit the property to avoid invalid ARIA states.
**Action:** Proactively ensure navigation items utilize dynamic `aria-current` and robust `focus-visible` utility classes across UI repos.
