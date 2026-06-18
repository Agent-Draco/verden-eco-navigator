## 2026-06-18 - Standardize Keyboard Focus Patterns

**Learning:** Custom interactive elements (like GlassButton, BottomNav) built outside the standard Radix/UI library drop default browser focus styles without replacing them, making the app difficult to navigate via keyboard.
**Action:** Always verify custom buttons implement the project's standard focus indicator pattern: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
