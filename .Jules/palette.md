## 2025-02-28 - SidebarNav Keyword Accessibility
**Learning:** Custom tooltip-like labels relying on `group-hover:opacity-100` are entirely invisible to keyboard users navigating via Tab.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` and ensure the parent button has `focus-visible` ring utilities to maintain accessibility.
