## 2024-05-06 - Interactive Element Accessibility Enhancements

**Learning:** Custom interactive components based on Framer Motion's `motion.button` (like `GlassButton`) inherit standard HTML button attributes but often lack native interactive styles in custom component systems, leading to poor keyboard accessibility and invisible disabled states out-of-the-box.
**Action:** Always append Tailwind `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` and `disabled:opacity-50 disabled:pointer-events-none` to base interactive classes in custom UI components.
