## 2023-10-25 - Sidebar Navigation Accessibility and Focus Indicators

**Learning:** When using custom tooltip-like labels relying on `group-hover:opacity-100`, they should be paired with `group-focus-visible:opacity-100` and `focus-visible` styles on the parent interactive element to maintain full keyboard accessibility and visibility for screen navigators. Setting `aria-hidden="true"` on inner decorative content prevents redundant screen reader announcements.
**Action:** Always verify `focus-visible` outlines and ARIA labels are added to custom interactive components and icons.
