## 2023-10-25 - Standardizing Navigation ARIA States
**Learning:** Custom navigation components in React Router without semantic anchor tags often lack screen-reader context for active routes.
**Action:** Always append `aria-current="page"` to active route buttons and `focus-visible` utilities to ensure keyboard usability.
