## 2026-06-27 - Standardize Navigation Accessibility
**Learning:** Navigation components often lack semantic state indicators (like aria-current) and keyboard focus rings when built with custom buttons instead of native links.
**Action:** Ensure active routes utilize aria-current="page" and apply focus-visible utilities to custom interactive elements to maintain screen-reader accessibility and keyboard usability.
