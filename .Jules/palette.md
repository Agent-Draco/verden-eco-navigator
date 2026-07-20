## 2024-05-24 - Accessibility on password toggles
**Learning:** Icon-only buttons need aria labels. Also, the inner icon should have aria-hidden to prevent screen readers from reading redundant information. Adding type="button" prevents accidental form submissions.
**Action:** Always add aria-label, aria-hidden to inner icons, and type="button" to icon-only buttons in forms.
