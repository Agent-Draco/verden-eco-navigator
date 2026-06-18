## 2026-06-18 - Propagate accessibility styles to custom components
**Learning:** Custom interactive components like `GlassButton` often miss out on the standard keyboard focus indicators and disabled states built into ShadCN ui components.
**Action:** Ensure all interactive elements consistently implement `focus-visible:ring` and `disabled:opacity-50 disabled:pointer-events-none` styles.
