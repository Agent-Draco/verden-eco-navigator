## 2024-07-17 - Improve navigation accessibility

**Learning:** Tooltips revealed via `group-hover` should include `group-focus-visible` for keyboard users, and active links benefit from `aria-current="page"`. Decorative icons inside labeled interactive elements should use `aria-hidden="true"` to prevent redundant screen reader announcements.
**Action:** Always ensure `group-focus-visible` is paired with `group-hover` for custom tooltips, consistently apply `aria-current="page"` to active links, and hide decorative elements from screen readers.
