## 2024-03-24 - Accessibility: ARIA Labels for Icon Buttons

**Learning:** When creating custom wrapper components for buttons that render strictly as icons (like `GlassButton` with `size="icon"`), it is critical to supply an explicit `aria-label`. Screen readers cannot infer intent from an SVG or emoji icon alone, which effectively creates "invisible" or "unlabeled button" interactive traps.
**Action:** Always ensure that icon-only instances of reusable UI components receive an `aria-label` to satisfy WCAG and improve basic keyboard/screen reader navigation.
