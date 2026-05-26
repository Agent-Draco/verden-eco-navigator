## 2024-05-26 - Navigation Accessibility Enhancements

**Learning:** Navigation components in this project (`SidebarNav`, `BottomNav`) were missing keyboard focus visibility and `aria-current` indicators for screen readers. Using `focus-visible` ensures keyboard accessibility without polluting the UI for mouse users.
**Action:** Always verify `focus-visible` and `aria-current` states when creating or modifying navigation links and interactive buttons in React applications to maintain high accessibility standards.
