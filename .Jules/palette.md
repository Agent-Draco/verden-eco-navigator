## 2026-06-15 - Enhanced Navigation Accessibility
**Learning:** Navigation buttons (e.g. bottom nav) often lack clear `aria-current` roles and robust keyboard focus states, making them difficult to interact with via keyboard and screen readers.
**Action:** Applied `aria-current="page"` conditionally to active nav items and added explicit `focus-visible` styling across navigation components for improved keyboard accessibility.
