# Palette's Journal

## 2025-05-18 - Missing Accessible Names on Custom Interactive Elements

**Learning:** When using custom icon-only components like `GlassButton` with `size="icon"`, they often lack text content and fail to inherently provide an accessible name to screen readers.
**Action:** Always verify that a descriptive `aria-label` attribute is applied to instances of `GlassButton` (and similar components) when no visible text is present.