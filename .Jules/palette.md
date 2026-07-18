## 2024-07-18 - Improve Sidebar Navigation Accessibility
**Learning:** Decorative icons in interactive elements need `aria-hidden="true"` to prevent redundant screen reader announcements. Interactive navigation links benefit from explicit `aria-current="page"` and `group-focus-visible` to reveal tooltips for keyboard users.
**Action:** Always verify keyboard focus states and add `aria-current` to active navigation items in all future sidebars/bottom navs.
