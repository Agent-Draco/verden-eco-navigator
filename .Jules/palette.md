## 2024-05-24 - Missing ARIA Labels on Icon-Only Buttons

**Learning:** Custom interactive components (like `GlassButton`) used purely with icons frequently lack accessibility labels, making them invisible or unclear to screen reader users.
**Action:** Always verify and add `aria-label` to icon-only buttons to ensure keyboard and screen reader accessibility, even if the visual context seems obvious.
