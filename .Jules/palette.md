## 2024-06-28 - Custom Interactive Element Accessibility

**Learning:** Custom interactive elements like bottom navs and sidebars often lack semantic `aria-current="page"` and `focus-visible` indicators. Relying solely on visual active states causes an accessibility gap for screen readers and keyboard users.
**Action:** Standardize ARIA and focus-visible tailwind patterns (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) across all interactive UI components.
