## 2026-06-16 - Enhance Nav Accessibility

**Learning:** Custom navigation components (SidebarNav, BottomNav) lacked explicit semantic state (`aria-current`) for active items and robust keyboard focus indicators (`focus-visible` classes), reducing accessibility for screen reader and keyboard users.
**Action:** Applied conditionally rendered `aria-current="page"` and explicit Tailwind `focus-visible` rings to custom nav buttons to align with standard accessibility patterns.
