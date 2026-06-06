## 2026-06-06 - Focus Visible on Navigations
**Learning:** Even though mobile apps and bottom navigations often appear to lack focus states, explicit `focus-visible` ring stylings should be added. This ensures keyboard accessibility without disrupting mouse users.
**Action:** Always verify `focus-visible` and `aria-current=\"page\"` are present on dynamically rendered navigation elements (e.g., `.map(...)` iterations).
