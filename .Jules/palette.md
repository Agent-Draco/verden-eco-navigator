## 2024-07-20 - Add keyboard accessibility to Sidebar Navigation

**Learning:** When implementing Tailwind tooltips or labels that appear on `group-hover:opacity-100`, they must always be explicitly paired with `group-focus-visible:opacity-100` to ensure they are visible to keyboard users navigating via focus. Active link elements should also explicitly include `aria-current="page"`.
**Action:** Apply `group-focus-visible:opacity-100` to any tooltip shown on hover, ensure all icon-only buttons have `aria-hidden="true"` on the SVG if an `aria-label` or visual tooltip exists, and add `focus-visible` styles for clear keyboard navigation focus states.
