## 2025-02-27 - Improve Keyboard and Screen Reader Accessibility for Navigation Links
**Learning:** Adding `aria-current="page"` to active links provides crucial context for screen readers, while distinct `focus-visible` styles ensure users relying on keyboard navigation can clearly track their location without affecting mouse users.
**Action:** Apply `aria-current={active ? "page" : undefined}` conditionally on navigation items, and ensure consistent `focus-visible` utility classes are included across all interactive components (buttons, links).
