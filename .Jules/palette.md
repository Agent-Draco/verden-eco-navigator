## 2026-04-11 - Add aria-labels to icon-only buttons

**Learning:** Icon-only buttons (like floating action buttons) are completely inaccessible to screen readers without explicit labels. Framer Motion wrappers like `GlassButton` passing through HTML props correctly is useful.
**Action:** Always check floating action buttons or any button without text content for an `aria-label`.
