## 2024-05-18 - Semantic Navigation Accessibility

**Learning:** Navigation bars (BottomNav/SidebarNav) without semantic active states `aria-current='page'` or clear focus rings reduce usability for keyboard and screen reader users.
**Action:** Add standard `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` and `aria-current` to navigation components.
