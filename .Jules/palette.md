## 2025-06-04 - Improve Navigation Accessibility

**Learning:** Custom navigation components (SidebarNav and BottomNav) using simple buttons were missing `aria-current="page"` indicators for active routes and explicit `focus-visible` styling, making keyboard navigation and screen-reader use sub-optimal.
**Action:** Dynamically set `aria-current={active ? 'page' : undefined}` on navigation links and added explicit `focus-visible` ring styling to improve accessibility without disrupting mouse users.
