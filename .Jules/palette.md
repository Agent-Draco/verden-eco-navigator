
## 2026-05-26 - Navigation Accessibility

**Learning:** Dynamic active states in navigation components (e.g., SidebarNav, BottomNav) must use `aria-current={active ? 'page' : undefined}` to communicate current page state to screen readers without leaving invalid attributes on inactive items. Adding explicit `focus-visible:ring-2 focus-visible:ring-primary` provides essential keyboard navigation feedback without disrupting mouse users.
**Action:** Apply `aria-current` conditionally and `focus-visible` utility classes to custom navigation buttons across all React projects.
