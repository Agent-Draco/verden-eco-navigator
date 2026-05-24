## 2026-05-24 - Enhance Keyboard Navigation Accessibility
**Learning:** Adding explicit focus-visible Tailwind classes (`focus-visible:ring-2`) and dynamic `aria-current="page"` attributes to custom navigation components greatly improves keyboard and screen reader accessibility without disrupting the visual experience for mouse users.
**Action:** Always verify that interactive custom components (like buttons and nav items) define visible focus states and communicate their active state semantically.
