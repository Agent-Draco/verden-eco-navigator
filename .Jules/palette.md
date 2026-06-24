## 2026-06-24 - Semantic Navigation & Keyboard Focus

**Learning:** Custom UI elements like GlassButton and navigation sidebars often miss standard browser focus outlines due to custom styling or CSS resets, causing keyboard users to lose their place. Additionally, visual active states on navigation do not convey meaning to screen readers without `aria-current="page"`.
**Action:** Always pair visual active states with semantic ARIA states (`aria-current="page"`) and ensure custom interactive elements include explicit `focus-visible` Tailwind classes to maintain accessibility.
