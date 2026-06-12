## 2024-06-12 - Explicit focus-visible and aria-current for Navigations
**Learning:** Custom navigation buttons often lack standard keyboard focus states and screen reader cues for active pages.
**Action:** Always include `aria-current="page"` conditionally for active route items and use `focus-visible` styling (`focus-visible:ring-2`) to ensure keyboard navigability without affecting mouse users.
