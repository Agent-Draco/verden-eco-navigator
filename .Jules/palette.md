## 2024-06-05 - Add ARIA Current and Focus Visible to Navigation Menus

**Learning:** Navigation menus (SidebarNav, BottomNav) lacked `aria-current="page"` and `focus-visible` styling, making screen reader interpretation ambiguous and keyboard navigation invisible.
**Action:** Always add dynamic `aria-current` based on route active state and explicit `focus-visible` ring styling to interactive navigation elements to ensure complete accessibility without disrupting mouse users.
