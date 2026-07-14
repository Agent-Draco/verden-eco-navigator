## 2024-07-15 - Improve keyboard accessibility in sidebar navigation
**Learning:** Adding standard focus-visible rings and tying tooltip opacity to focus-visible state significantly improves keyboard navigation accessibility without compromising visual design for pointer users. Decorative icons should include `aria-hidden="true"` when their parent button has an `aria-label`.
**Action:** Always implement `focus-visible` utility classes for interactive custom elements and pair `group-hover` with `group-focus-visible` for tooltips/labels attached to focusable containers.
