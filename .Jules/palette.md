## 2024-07-08 - Keyboard Navigation & Focus Visible

**Learning:** Interactive elements relying on `group-hover` for revealing information (like tooltips or labels) often break for keyboard users because `group-focus-visible` is omitted. Additionally, custom styled buttons lose native browser focus rings.
**Action:** Always pair `group-hover:opacity-100` with `group-focus-visible:opacity-100` and consistently apply standard focus ring classes (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) to all interactive elements to ensure accessibility for screen navigators.
