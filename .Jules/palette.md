## 2024-07-15 - Add Missing ARIA Labels to Icon Buttons

**Learning:** Interactive icon-only elements (like navigation arrows, emojis, or send buttons) without visible text labels must have an explicit `aria-label` attribute (or `sr-only` text if emoji content) for screen reader accessibility. Emojis within interactive elements should be wrapped in an `aria-hidden="true"` span if accompanied by `sr-only` text to avoid duplicate or confusing readings.
**Action:** Always verify `aria-label` properties exist when using `<GlassButton size="icon">` or similar icon-centric components across the application.
