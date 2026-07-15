## 2024-03-24 - Navigation Accessibility
**Learning:** Custom interactive elements (like icon-only nav buttons) often lack focus states and aria attributes. Screen readers announce decorative icons redundantly if not hidden.
**Action:** Always add aria-hidden="true" to SVG icons, aria-current="page" to active nav links, and explicit focus-visible styles with offset rings. Pair group-hover:opacity-100 with group-focus-visible:opacity-100 on custom tooltips.
