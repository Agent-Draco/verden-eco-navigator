## 2024-10-25 - Accessible Navigation Focus States
**Learning:** Custom interactive components like SidebarNav lacked both screen reader semantic state (`aria-current`) and visible keyboard focus styles, relying solely on hover.
**Action:** Always pair `aria-current="page"` with visual active/focus indicators (`focus-visible:ring-*`) when standardizing navigation components to maintain full accessibility.
