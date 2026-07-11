## 2024-05-15 - Focus Visibility and Decorative Icons

**Learning:** When using custom focus-visible states and tooltip-like labels relying on group-hover, they must be paired with group-focus-visible and proper focus-visible styles to maintain keyboard accessibility. Decorative icons inside labeled buttons should have aria-hidden="true".
**Action:** Always ensure group-focus-visible is added alongside group-hover for tooltips, and standard focus-visible rings are applied to custom interactive elements.
