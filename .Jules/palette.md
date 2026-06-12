## 2024-05-15 - Navigation Accessibility Enhancement
**Learning:** Navigation buttons lack screen-reader context for the active state and miss keyboard focus outlines, making them inaccessible for keyboard users.
**Action:** Always conditionally set `aria-current="page"` on active navigation items and apply explicit `focus-visible` ring styles to ensure accessibility without disrupting mouse users.
