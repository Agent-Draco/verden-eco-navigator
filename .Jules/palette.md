## 2025-05-18 - Keyboard Focus for Group-Hover UI
**Learning:** Custom tooltip-like labels relying on `group-hover:opacity-100` are invisible to keyboard navigators unless explicitly paired with `group-focus-visible:opacity-100`.
**Action:** Always pair `group-hover` visibility utilities with `group-focus-visible` and ensure the parent interactive element has `focus-visible` styles to maintain full accessibility.
