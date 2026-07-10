## 2024-07-10 - Focus-visible states for hidden tooltips

**Learning:** Tooltip-like labels that rely on `group-hover:opacity-100` are inaccessible to keyboard users unless paired with `group-focus-visible:opacity-100` on the parent group.
**Action:** Always pair hover states with focus-visible states, particularly for revealing helper text or tooltips on navigation items, and ensure interactive elements have clear focus rings.
