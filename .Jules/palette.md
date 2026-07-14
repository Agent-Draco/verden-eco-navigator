## 2024-07-14 - Missing aria-labels on icon-only buttons
**Learning:** Icon-only buttons using emojis or SVG icons often lack descriptive names, causing screen readers to announce "button" or the raw emoji name, providing a poor experience for visually impaired users.
**Action:** Always add `aria-label` to icon-only interactive elements and wrap raw emojis in `<span aria-hidden="true">` or add `aria-hidden="true"` to icon components to prevent redundant announcements.
