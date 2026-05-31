## 2023-10-24 - Improve Keyboard and Screen Reader Accessibility in Navigation

**Learning:** It is crucial to use conditional `aria-current="page"` and `focus-visible` styling (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background`) for custom React navigation components. This correctly directs screen readers to the active page and allows tab-based keyboard navigation without breaking the visual aesthetic for mouse users.
**Action:** Apply this combination (conditional `aria-current` and robust `focus-visible` ring styling) to all custom navigation bars (e.g., SidebarNav, BottomNav) across projects to ensure full accessible interactive compliance.
