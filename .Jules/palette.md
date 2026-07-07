## 2024-12-07 - Ensure tooltips show on focus
**Learning:** Tooltip-like labels that rely on `group-hover:opacity-100` are inaccessible via keyboard unless paired with `group-focus-visible:opacity-100` and focus-visible indicators on the interactive element.
**Action:** Always ensure hover states for critical UI hints have corresponding focus states to maintain full keyboard accessibility.
