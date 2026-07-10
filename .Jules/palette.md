## 2024-05-15 - Keyboard Navigation & Tooltip Visibility Enhancement
**Learning:** Tooltip-like labels relying solely on `group-hover:opacity-100` hide critical context from keyboard-only users navigating via `Tab`.
**Action:** Always combine `group-hover:opacity-100` with `group-focus-visible:opacity-100`, and ensure interactive parent elements have standard `focus-visible:ring` styles so keyboard focus is apparent and context remains accessible.
