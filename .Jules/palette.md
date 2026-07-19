## 2024-05-15 - Sidebar Navigation Accessibility Polish

**Learning:** When using tooltip-like labels that appear on group-hover, keyboard users miss them entirely unless paired with group-focus-visible. Additionally, screen readers need explicit context via aria-current="page" for active navigation items.
**Action:** Ensure custom navigation components always receive explicit keyboard focus states (focus-visible), aria context for active states, and decorative icons are hidden with aria-hidden="true" when visible labels are present.
