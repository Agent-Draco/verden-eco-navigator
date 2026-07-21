## 2024-05-18 - [Add ARIA labels to password toggle]
**Learning:** Icon-only interactive elements like password toggles inside forms require explicit aria-labels, type="button" to avoid unintended form submissions, and aria-hidden="true" on the SVG to prevent redundant screen reader announcements. Focus-visible styles ensure keyboard accessibility.
**Action:** Always add semantic ARIA attributes and correct button types to custom icon toggles.
