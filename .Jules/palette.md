## 2024-05-02 - Ensure GlassButton Handles Disabled States Correctly

**Learning:** When using Framer Motion wrapper elements (like `<motion.button>`) as core UI components, they might inherit complex animated base styles but omit critical structural accessibility states like `focus-visible` or `disabled` visual indicators. This makes them invisible to keyboard navigators and causes confusion if disabled.
**Action:** Always add explicit `focus-visible:ring-*` and `disabled:opacity-50 disabled:pointer-events-none` classes to the base layer of custom interactive components.
