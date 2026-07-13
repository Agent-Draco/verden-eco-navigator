
## 2024-07-13 - Focus Styles & ARIA labels in custom navigation

**Learning:** Tooltip-style hover labels require explicitly added `group-focus-visible:opacity-100` alongside `group-hover:opacity-100` to be fully accessible for keyboard navigators, especially when paired with ARIA-hidden icons.
**Action:** I will add `group-focus-visible` to interactive hover components by default, and ensure that custom buttons all implement focus rings via `focus-visible:ring`.
