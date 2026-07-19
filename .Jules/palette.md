## 2024-07-20 - Icon-Only Button Accessibility
**Learning:** Icon-only toggle buttons (like password visibility) require explicitly defined `aria-label` attributes for screen readers, while the decorative icons themselves must be hidden using `aria-hidden="true"` to avoid redundant announcements.
**Action:** Always pair `aria-label` on buttons with `aria-hidden="true"` on their inner icons, and ensure `type="button"` is set to prevent form submission in form contexts.
