## 2026-06-02 - Adding accessibility to SidebarNav
**Learning:** Interactive elements in navigation bars often lack proper ARIA context and visible focus states, significantly hindering keyboard and screen reader accessibility.
**Action:** Proactively apply `aria-current='page'` conditionally to active navigation links and explicitly define `focus-visible` tailwind rings to ensure robust keyboard navigation.
