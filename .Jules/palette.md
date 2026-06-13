## 2025-05-16 - Add focus-visible states and aria-current for active navigation tabs

**Learning:** Navigation menus and interactive icon buttons often neglect explicit keyboard focus states and `aria-current` attributes which impairs screen reader users understanding context.
**Action:** Always add explicit `focus-visible` ring stylings (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) and set `aria-current="page"` conditionally when building navigation menus.
