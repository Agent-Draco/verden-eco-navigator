## 2024-05-18 - Missing ARIA Labels on Custom Framer Motion Components

**Learning:** Custom components wrapping native interactive elements (like `<motion.button>` inside `GlassButton`) frequently miss semantic attributes like `aria-label` when used merely for icons or visual variants. This creates significant accessibility barriers for screen reader users on key interactive surfaces like navigation or filtering options.
**Action:** Always ensure that icon-only instances of reusable UI components (e.g. `GlassButton size="icon"`) have an explicitly assigned `aria-label` attribute describing their function. Update accessibility audits to specifically look for isolated icons wrapping interactive components.
