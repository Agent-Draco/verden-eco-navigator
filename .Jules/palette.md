## 2026-06-21 - Accessible Password Toggles
**Learning:** Icon-only password visibility buttons lack semantic meaning for screen readers and keyboard focus indicators without explicit attributes.
**Action:** Always add aria-label (dynamic based on state), aria-pressed, and focus-visible rings to custom toggle buttons.
