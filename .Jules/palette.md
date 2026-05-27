## 2025-05-27 - Added Focus States and ARIA attributes for Navigation

**Learning:** It is crucial for shared navigation elements to have explicit `focus-visible` styling and dynamic `aria-current` attributes to ensure robust keyboard accessibility without affecting visual styling for mouse users.
**Action:** Consistently apply `aria-current={active ? 'page' : undefined}` and `focus-visible:ring-2` to navigation buttons to improve accessibility across applications.
