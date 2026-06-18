## 2026-06-18 - Focus Visible Styles for Custom Interactive Elements

**Learning:** Custom interactive elements like `GlassButton` often lack built-in focus indicators, which severely impairs keyboard navigation and accessibility. Tailwind provides a standard utility pattern for this: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`.
**Action:** Apply this pattern proactively to all custom interactive components (buttons, toggles, cards acting as buttons) across repositories to ensure a baseline of keyboard accessibility without compromising the default design.
