## 2024-03-24 - Accessibility for Icon Buttons

**Learning:** Icon-only buttons like password visibility toggles often lack screen-reader context and keyboard focus states.
**Action:** Always add `aria-label`, `aria-pressed` (if a toggle), and `focus-visible` ring styles to icon-only interactive elements.
