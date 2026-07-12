## 2024-07-12 - Navigation Accessibility Improvements

**Learning:** Tooltip-like labels relying on `group-hover` must always be paired with `group-focus-visible` to ensure keyboard navigators can perceive the same information as mouse users. Additionally, decorative icons inside buttons with explicit text or `aria-label` attributes should be explicitly hidden from screen readers using `aria-hidden="true"` to avoid redundant or confusing announcements.
**Action:** Always verify that hover states have equivalent focus states (`focus-visible`) and ensure accessible naming conventions hide purely decorative visual elements.
