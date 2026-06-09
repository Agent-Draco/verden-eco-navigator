## 2025-06-09 - Navigation Accessibility (SidebarNav)
**Learning:** Icon-only navigation buttons and conditional dynamic styling require explicit `aria-current` attributes and `focus-visible` styling to support screen readers and keyboard navigation reliably.
**Action:** Always apply `aria-current={active ? 'page' : undefined}` and explicit `focus-visible` ring styling to main navigation elements across projects.
