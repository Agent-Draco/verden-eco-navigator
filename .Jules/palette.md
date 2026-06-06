## 2025-06-06 - Accessible Navigation Indicators and Focus States

**Learning:** When using custom icon-based navigation components, keyboard focus visibility is often lost, and screen readers may not know which item is active without explicit `aria-current` attributes.
**Action:** Consistently apply `aria-current={active ? 'page' : undefined}` to navigation links and use `focus-visible:ring-2 focus-visible:ring-primary` for explicit keyboard focus states.
