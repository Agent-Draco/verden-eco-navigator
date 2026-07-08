## 2024-07-08 - Added focus-visible states to Navigation elements

**Learning:** Tooltip-like labels on buttons that rely on `group-hover:opacity-100` are invisible to keyboard navigators unless paired with a focus state. Elements need `focus-visible` styles to ensure full keyboard accessibility.
**Action:** Always pair `group-hover` visibility changes with `group-focus-visible` on interactive elements, and apply standard `focus-visible:ring-2` to their parent interactive element.
