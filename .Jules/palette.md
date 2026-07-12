## 2024-12-05 - Add ARIA labels to icon buttons

**Learning:** Icon-only buttons lack accessible names, making them invisible or confusing to screen readers. Emojis can also be read aloud unpredictably without standard wrappers.
**Action:** Always add `aria-label` to buttons that only contain icons, and consider `aria-hidden="true"` on the icon itself (including emojis) to prevent redundant screen reader announcements.
