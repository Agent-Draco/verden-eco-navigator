
## 2024-05-01 - Interactive Div Accessibility

**Learning:** Div-based components acting as custom buttons (like `GlassCard` used for list selection) must not only have an `onClick` handler but also `role="button"`, `tabIndex={0}`, an `onKeyDown` handler for Space and Enter keys, and visual focus states to ensure keyboard accessibility.
**Action:** When implementing custom interactive elements out of non-interactive HTML tags, I will proactively add `role`, `tabIndex`, keydown handlers, and `focus-visible` styles.
