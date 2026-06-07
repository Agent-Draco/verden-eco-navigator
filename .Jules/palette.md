## 2024-03-22 - Improve Navigation Keyboard Accessibility

**Learning:** Many icon-only navigation buttons lacked explicit `focus-visible` styles and active link indicators (`aria-current`), which impairs keyboard navigation and screen reader support.
**Action:** Added `aria-current="page"` and robust `focus-visible` styling (ring offset and primary colors) to both `SidebarNav.tsx` and `BottomNav.tsx` navigation items.
