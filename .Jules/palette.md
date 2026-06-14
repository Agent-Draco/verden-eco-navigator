## 2026-06-14 - Added aria-current to NavItems
**Learning:** Navigation buttons lack screen-reader context for the active state and missing focus-visible styling.
**Action:** Use `aria-current="page"` conditionally based on route state and add explicit `focus-visible` utility classes.
