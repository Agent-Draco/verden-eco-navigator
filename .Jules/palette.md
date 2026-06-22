## 2026-06-22 - Standardize Navigation Accessibility
**Learning:** Custom interactive elements like BottomNav and SidebarNav often lack ARIA active states (e.g. `aria-current="page"`) and explicit visual keyboard focus indicators, making them less accessible for screen reader and keyboard users.
**Action:** Standardize the use of semantic `aria-current` alongside Tailwind `focus-visible:ring` patterns on all custom routing components.
