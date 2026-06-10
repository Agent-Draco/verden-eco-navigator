## 2026-06-10 - Navigation Accessibility Enhancements

**Learning:** Active navigation states must dynamically set `aria-current="page"` and incorporate explicit `focus-visible` ring styling to ensure robust keyboard accessibility without disrupting mouse users.

**Action:** Always apply `aria-current={active ? 'page' : undefined}` and `focus-visible:ring-2 focus-visible:outline-none` utilities on interactive navigation elements.
