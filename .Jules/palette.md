## 2025-06-13 - Accessible Keyboard Focus on Custom Nav Buttons
**Learning:** Custom navigational buttons mapped to paths via `onClick` frequently miss essential native accessibility features like `aria-current` and explicit keyboard focus indicators, making them difficult for screen readers and keyboard users to navigate.
**Action:** Consistently enforce `aria-current="page"` on active custom navigational elements and add `focus-visible` styling (e.g., ring/outline) so keyboard users can perceive focus without disrupting mouse user experience.
