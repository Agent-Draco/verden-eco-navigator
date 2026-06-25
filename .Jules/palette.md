## 2026-06-25 - Standardized ARIA and Keyboard Navigation

**Learning:** The project's custom navigational components (`SidebarNav`, `BottomNav`, `GlassButton`) lacked native focus outlines, making keyboard navigation difficult. Active routes also needed semantic screen-reader states.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` to interactive custom elements and `aria-current="page"` to active links to ensure consistent accessibility across the application.
