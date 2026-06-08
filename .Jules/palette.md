## 2026-06-08 - Added keyboard and screen reader accessibility to Navigation Components

**Learning:** Navigation bars (SidebarNav, BottomNav) often rely heavily on visual cues (color changes, glowing effects) for active states, missing semantic indicators for screen readers and distinct keyboard focus indicators.
**Action:** Always add `aria-current='page'` to active nav links and ensure explicit `focus-visible:ring-*` styling is present for keyboard navigation without breaking mouse UX.
