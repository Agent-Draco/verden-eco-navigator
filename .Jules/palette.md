## 2026-07-01 - Standardize Navigation Focus and ARIA States
**Learning:** Custom interactive elements like Sidebars and BottomNavs often lack semantic `aria-current` properties and native keyboard focus styles, making them inaccessible to screen readers and keyboard users.
**Action:** Always pair `aria-current="page"` with robust visual focus indicators (`focus-visible:ring-2`) on custom route navigation items.
