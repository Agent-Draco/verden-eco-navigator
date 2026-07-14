## 2024-05-20 - Added ARIA labels to icon-only transport buttons

**Learning:** Icon-only buttons without `aria-label` attributes and hidden icons cause screen readers to announce nothing or confusing content (like raw SVGs or emojis). Wrapping emojis in `<span aria-hidden="true">` ensures they aren't redundantly read when an `aria-label` is present.
**Action:** Always pair `aria-label` with `aria-hidden="true"` on the decorative icon/emoji when creating icon-only buttons to ensure clear, concise screen reader announcements.
