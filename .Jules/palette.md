## 2024-06-08 - Added Accessible Navigation States

**Learning:** Navigation components often rely only on visual indicators (like color or opacity) for active states, missing semantic meaning for screen readers. Icon-only navigation also often lacks aria-labels.
**Action:** Added `aria-current="page"`, `aria-label`, and `focus-visible` utility classes to `SidebarNav` and `BottomNav` to improve keyboard navigation and screen reader support without disrupting mouse users.
