
## 2024-05-24 - Accessibility: Navigation Component Focus & Current State
**Learning:** The navigation components (`SidebarNav`, `BottomNav`) were missing keyboard focus states and explicit indication of the current active page for screen readers.
**Action:** Added `aria-current={active ? 'page' : undefined}` to dynamically indicate the active route and standard `focus-visible:ring` classes to ensure visible keyboard navigation without affecting mouse users.
