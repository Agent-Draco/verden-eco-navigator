## 2024-06-28 - Navigation Accessibility Standardization
**Learning:** Custom interactive elements (like SidebarNav and BottomNav) often lack semantic screen reader state indicators for active routes and missing keyboard focus outlines.
**Action:** Always pair `aria-current="page"` with visible `focus-visible` states using Tailwind utility classes on custom navigation elements.
