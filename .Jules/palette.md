## 2023-10-27 - Sidebar Nav Keyboard Accessibility

**Learning:** When using `group-hover:opacity-100` for tooltips or labels on icon buttons, keyboard-only users will not see these labels when focusing the elements. Standard `focus-visible` ring indicators should also be applied to interactive elements.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` and ensure interactive elements have standard `focus-visible:ring-2` styles.
