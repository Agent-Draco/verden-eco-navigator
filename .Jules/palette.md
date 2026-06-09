## 2024-06-09 - Accessible Navigation Patterns

**Learning:** Custom navigation components (like SidebarNav and BottomNav) often lack clear keyboard focus states (`focus-visible`) and semantic active indicators (`aria-current="page"`) when built with generic buttons instead of semantic links.
**Action:** Always ensure custom navigation buttons include explicit `focus-visible` ring styling and dynamic `aria-current` attributes to provide equivalent context for screen reader and keyboard users without disrupting mouse interactions.