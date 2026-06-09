## 2024-06-10 - Keyboard Navigation & Active States

**Learning:** Custom navigation components (like SidebarNav and BottomNav) frequently miss built-in accessibility features found in native anchor tags, particularly `aria-current="page"` for screen readers and explicit `focus-visible` outlines for keyboard users.
**Action:** Always verify that interactive custom elements have explicit `focus-visible` styles (e.g. `focus-visible:ring-2`) and dynamically set `aria-current` based on active route state to ensure parity with standard navigation elements.
