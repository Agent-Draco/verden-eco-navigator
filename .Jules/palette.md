## 2026-06-16 - Enhanced Navigation Accessibility
**Learning:** Navigation components often rely only on visual cues for active states and lack explicit keyboard focus styles, reducing accessibility for screen reader and keyboard users.
**Action:** Dynamically set `aria-current='page'` on active links and apply `focus-visible` utility classes to ensure accessible and clear navigation states.
