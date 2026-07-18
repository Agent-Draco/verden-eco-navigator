## 2024-07-18 - Add ARIA label and button type to password toggle

**Learning:** Interactive icon-only buttons (like password visibility toggles) often lack accessible names, breaking screen reader functionality, and can trigger unintended form submissions if `type="button"` is missing.
**Action:** Ensure all future icon-only buttons include an `aria-label`, have decorative icons marked with `aria-hidden="true"`, and explicitly set `type="button"` when outside of standard form submission logic.
