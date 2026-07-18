## 2024-07-18 - Accessible Navigation Patterns

**Learning:** Relying solely on `group-hover:opacity-100` for tooltips hides context from keyboard users. Adding `aria-current="page"` and `focus-visible` states are critical for inclusive navigation.
**Action:** Always pair `group-hover` with `group-focus-visible` for hidden labels, and explicitly mark active routes with `aria-current="page"`. Added `aria-hidden="true"` to SVG icons that have aria-labels on the parent button.
