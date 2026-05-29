## 2024-05-30 - Keyboard Accessibility for Navigation
**Learning:** Dynamically set `aria-current="page"` conditionally (e.g., `aria-current={active ? 'page' : undefined}`) on the active link and apply explicit `focus-visible` ring styling (e.g., `focus-visible:ring-2`) to ensure keyboard accessibility without disrupting mouse users.
**Action:** Apply this pattern to all navigation components (SidebarNav, BottomNav) to improve accessibility.
