
## 2024-07-08 - Keyboard Accessible Custom Tooltips
**Learning:** Custom tooltips built with `group-hover:opacity-100` are invisible to keyboard users unless paired with `group-focus-visible:opacity-100`. The parent button must also have standard `focus-visible` outline styles to maintain full accessibility.
**Action:** Always verify keyboard accessibility (`Tab` key testing) on custom hover-based UI elements and ensure `focus-visible` classes are implemented alongside hover states.
