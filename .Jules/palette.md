## 2025-03-05 - Navigation Accessibility

**Learning:** Navigation buttons (SidebarNav, BottomNav) often lack `aria-current` to communicate the active page to screen readers, and frequently lack explicit `focus-visible` styles which are critical for keyboard navigation users.
**Action:** Added `aria-current` and explicit Tailwind `focus-visible:ring` styles to ensure keyboard accessibility without disrupting mouse users.