## 2024-05-24 - Accessible Icon-Only Toggle Buttons
**Learning:** Icon-only interactive elements (like password visibility toggles) often lack accessible names for screen readers and can unintentionally submit forms if `type="button"` is omitted. Furthermore, raw icons inside them cause redundant announcements.
**Action:** Always apply `aria-label` to the button, `aria-hidden="true"` to the inner decorative icon, explicitly set `type="button"`, and ensure visible focus states (`focus-visible`) for keyboard users.
