
## 2024-05-18 - Keyboard accessibility on icon buttons with tooltips

**Learning:** When using `group-hover:opacity-100` to show tooltips on hover over an icon button, it's essential to also include `group-focus-visible:opacity-100` and `focus-visible` ring styling on the parent button. This ensures that users navigating via keyboard can see the tooltip content and focus state.
**Action:** Always check for `group-hover` usage on interactive elements to ensure corresponding `focus-visible` styles exist for keyboard users.
