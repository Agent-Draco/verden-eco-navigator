## 2026-06-21 - Navigation Semantic Active States

**Learning:** Custom navigation components often rely solely on visual cues for active states. It's crucial to pair these visual states with semantic ARIA states like `aria-current="page"` and ensure interactive elements have keyboard focus indicators.
**Action:** When auditing or building navigation components (Sidebar, BottomNav), always verify that active routes use `aria-current="page"` and that all buttons implement standard `focus-visible` utility patterns.
