## 2024-05-01 - Focus Visible Patterns for Custom Elements

**Learning:** When using custom UI elements built with motion containers or div-based buttons (like `GlassButton`), standard outline focuses often break the intended design language or get suppressed. Developers frequently disable generic outlines but forget to replace them with deliberate design-aligned focus indicators.
**Action:** Always proactively apply Tailwind's `focus-visible` pseudo-class (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`) specifically when creating custom interactive elements. This ensures keyboard accessibility without compromising mouse/touch aesthetics.
