## 2024-05-29 - Improve keyboard navigation and screen reader semantics for main navigation components

**Learning:** Navigation buttons (SidebarNav and BottomNav) lack explicit `aria-current` values for screen readers to announce active pages, and lack `focus-visible` styling which makes keyboard navigation visually difficult.
**Action:** Always dynamically apply `aria-current={active ? 'page' : undefined}` and `focus-visible:ring-2` to navigation elements.
