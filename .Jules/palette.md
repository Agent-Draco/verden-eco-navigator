## 2024-06-10 - Keyboard Navigation & Screen Reader Improvements for Navigation Menus

**Learning:** The default button focus styles might not be visually distinct or properly contrasting across all browsers and themes. Icon-centric nav items with visually hidden or tooltip-style labels require explicit `aria-label` and `aria-current="page"` to convey state and purpose to screen readers.
**Action:** Ensure active navigation state uses `aria-current` and explicit, high-contrast `focus-visible` ring styling is applied to all interactive elements for keyboard accessibility.
