## 2025-01-01 - Enhance Navigation Accessibility
**Learning:** Navigation buttons lacking `aria-current` and explicit keyboard focus states (`focus-visible`) degrade accessibility.
**Action:** Dynamically set `aria-current="page"` and add `focus-visible` utility classes to ensure semantic meaning and keyboard navigability without affecting mouse users.
