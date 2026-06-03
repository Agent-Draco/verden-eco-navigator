## 2023-10-27 - Keyboard Navigation Accessibility

**Learning:** Adding explicit `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` to custom interactive buttons combined with `aria-current={active ? 'page' : undefined}` enhances keyboard navigation without disrupting mouse users.

**Action:** Consistently apply `focus-visible` styling to all custom navigation buttons and utilize `aria-current` to improve screen reader feedback.
