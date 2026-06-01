## 2024-06-01 - Improve Navigation Accessibility

**Learning:** Navigation buttons (SidebarNav and BottomNav) lack keyboard focus indicators and current state ARIA attributes. Using `aria-current={active ? "page" : undefined}` and a consistent `focus-visible` utility class pattern addresses these issues seamlessly.
**Action:** Always apply explicit focus-visible states and ARIA states to navigation components.
