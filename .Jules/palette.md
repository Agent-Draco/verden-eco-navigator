## 2024-07-16 - Add ARIA Labels to Password Visibility Toggle
**Learning:** Found an icon-only button used to toggle password visibility in `Login.tsx` missing an ARIA label.
**Action:** Always verify icon-only interactive elements have clear `aria-label` attributes to ensure they are accessible to screen readers, and that decorative icons inside them have `aria-hidden="true"`.
