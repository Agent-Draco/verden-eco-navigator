## 2024-06-21 - Navigation Accessibility

**Learning:** Standardized navigation components across applications frequently miss semantic ARIA states like `aria-current="page"` and explicit keyboard focus indicators when utilizing custom visual active states.
**Action:** Always verify custom navigational elements (Sidebars, BottomNavs) incorporate `aria-current="page"` alongside explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` classes to preserve keyboard and screen-reader accessibility.
