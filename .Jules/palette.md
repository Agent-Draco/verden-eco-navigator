## 2023-10-25 - Improve Sidebar Navigation Accessibility

**Learning:** Keyboard navigation requires both explicit focus indicators and pairing of `group-hover` with `group-focus-visible` to ensure tooltips appear on focus. Additionally, decorative icons need `aria-hidden="true"` to prevent redundant screen reader announcements.
**Action:** Add `focus-visible` styling, `aria-current`, and paired `group-focus-visible` classes to navigation components consistently.
