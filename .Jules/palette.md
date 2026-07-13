## 2024-03-24 - Accessibility on navigation items

**Learning:** When using tooltip-like text for primarily icon-based navigation bars, it is essential to have `aria-label`s on the button elements and hide the icons (`aria-hidden="true"`) to prevent redundant or confusing screen reader announcements. Additionally, using `group-focus-visible:opacity-100` alongside standard hover styles ensures the "tooltip" text appears during keyboard navigation.
**Action:** Ensure all future custom navigation elements or icon-buttons get proper focus states (`focus-visible:outline-none focus-visible:ring-2 ...`), have their inner decorative elements hidden from screen readers, and that visually hidden/tooltip text is revealed correctly upon keyboard focus.
