## 2024-07-13 - Focus and Tooltip Accessibility Pattern

**Learning:** When using opacity-based tooltips (`group-hover:opacity-100`), keyboard users miss the label unless `group-focus-visible:opacity-100` is explicitly added alongside proper focus rings.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` and `focus-visible` styling for interactive elements to ensure universal access.
