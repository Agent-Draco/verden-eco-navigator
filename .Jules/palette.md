## 2024-05-15 - Accessible Icon Button Tooltips
**Learning:** For custom tooltip-like labels relying on group-hover:opacity-100, they must be paired with group-focus-visible:opacity-100 and focus-visible styles on the parent element to maintain full keyboard accessibility.
**Action:** Always ensure hover states have equivalent focus-visible states, and apply aria-hidden="true" to decorative elements inside buttons with aria-labels.
