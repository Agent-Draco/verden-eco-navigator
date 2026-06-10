## 2025-06-10 - Accessible Navigation Links

**Learning:** Navigation buttons acting as links (e.g., SidebarNav, BottomNav) often lack `aria-current="page"` and explicit `focus-visible` styling, hindering keyboard and screen reader accessibility.
**Action:** Consistently apply `aria-current={active ? 'page' : undefined}` and `focus-visible:ring-2` to custom navigation link components to ensure accessible states without disrupting mouse users.
