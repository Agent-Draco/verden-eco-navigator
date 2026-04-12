## 2024-05-18 - Missing ARIA Labels on Custom Icon Buttons

**Learning:** When developers create custom button components (like `GlassButton`) that support an `icon` size variant, they often forget to pass down `aria-label`s for accessibility, relying purely on the visual icon for context.

**Action:** Whenever introducing or using custom UI components for icon-only actions, always explicitly define an `aria-label` to ensure screen reader compatibility.
