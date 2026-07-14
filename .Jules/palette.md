## 2024-05-24 - Accessibility for Icon-only Buttons
**Learning:** Found an icon-only button without an `aria-label` attribute in `src/pages/Login.tsx` (the show/hide password button). When buttons contain only an icon and no text, they are completely inaccessible to screen reader users because the screen reader has no content to announce.
**Action:** Always add `aria-label` attributes to icon-only buttons to ensure they are accessible. Added `aria-label` to the button and `aria-hidden="true"` to the icons themselves to avoid redundant or confusing announcements.
