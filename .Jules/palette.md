## 2024-06-10 - Accessible Icon-Only Toggles
**Learning:** Icon-only buttons (like password visibility toggles) often lack both screen-reader context and keyboard focus states, making them inaccessible to keyboard and assistive tech users.
**Action:** Always implement dynamic `aria-label`, `aria-pressed`, and explicit `focus-visible` styling for icon-only toggles.
