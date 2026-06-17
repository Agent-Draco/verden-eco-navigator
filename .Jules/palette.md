## 2026-06-17 - Keyboard Accessibility on Navigation

**Learning:** Navigation buttons lacking explicit focus states reduce keyboard accessibility, and icon+text navigation should still use explicit `aria-label` attributes.
**Action:** Add `focus-visible:ring-2` and explicit `aria-label` to navigation buttons in Side and Bottom navigation components.
