## 2024-03-24 - SidebarNav Keyboard Accessibility Enhancement

**Learning:** Custom interactive elements (like icon buttons with hover tooltips) often miss keyboard focus states and accessibility features compared to native components.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` and add standard `focus-visible:ring-ring` styling along with necessary `aria-current` attributes to ensure keyboard navigation visibility.
