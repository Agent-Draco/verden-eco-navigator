## 2024-03-20 - [Accessibility] Sidebar Nav Keyboard Support and ARIA

**Learning:** When using tailwind `group-hover:opacity-100` for tooltips, always pair it with `group-focus-visible:opacity-100` to ensure they are visible for keyboard navigation. Additionally, buttons with `aria-label`s should have their internal icons marked with `aria-hidden="true"` to prevent redundant screen reader announcements. Finally, active navigation items should have `aria-current="page"`.
**Action:** Apply `group-focus-visible` to hover states and use `aria-hidden="true"` for decorative icons across the application.
