## 2024-07-13 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Icon-only custom components like GlassButton frequently miss accessible names. Screen readers cannot properly announce buttons mapped via loops or custom icon sets (e.g., emojis or `<Car>` icons) unless explicit text labels or ARIA labels are added.
**Action:** Always audit icon-only buttons for `aria-label` or `aria-labelledby` attributes across the application to ensure full keyboard and screen reader accessibility.
