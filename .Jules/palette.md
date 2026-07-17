## 2024-05-24 - Add ARIA labels to icon-only map controls

**Learning:** Floating map controls (search, volume, alerts) used icon-only buttons without accessible names, making them confusing for screen reader users. Adding `aria-label` attributes and `aria-hidden="true"` to the decorative SVGs resolves this.
**Action:** Always ensure that buttons containing only icons or single characters are explicitly labelled with `aria-label`.
