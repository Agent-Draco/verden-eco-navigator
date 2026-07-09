## 2024-05-15 - [Accessibility]
**Learning:** Tooltip-like labels tied to `group-hover` must also support `group-focus-visible` to ensure keyboard navigation visibility. Parent buttons should have `focus-visible` outlines.
**Action:** Always add keyboard accessibility features (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` and `group-focus-visible:opacity-100`) to custom interactive elements.
