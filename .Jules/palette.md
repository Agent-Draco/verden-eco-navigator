## 2026-06-22 - Standardize Custom Navigation Accessibility

**Learning:** Custom navigation components (Sidebar/BottomNav) often lose native focus states and semantic active route context when rebuilt with Tailwind.
**Action:** Always include `aria-current="page"` on active routes and standardized `focus-visible` utility classes to maintain screen reader and keyboard accessibility consistency.
