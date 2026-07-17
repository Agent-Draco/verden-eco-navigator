## 2024-07-16 - Sidebar Accessibility Improvements
**Learning:** Tooltip-like labels in navigation menus that rely on `group-hover` opacity changes are invisible to keyboard users unless explicitly paired with `group-focus-visible`. Additionally, decorative icons within labeled interactive elements should be hidden from screen readers.
**Action:** Future navigation components should consistently pair `group-hover:opacity-100` with `group-focus-visible:opacity-100`, use `aria-current="page"` for active links, and hide decorative icons using `aria-hidden="true"`.
