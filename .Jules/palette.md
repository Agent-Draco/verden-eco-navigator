## 2026-06-14 - Navigation Accessibility
**Learning:** Navigation buttons lacking `aria-current="page"` and explicit `focus-visible` styles diminish keyboard navigability and screen-reader context.
**Action:** Always conditionally set `aria-current={active ? 'page' : undefined}` on active links and provide explicit `focus-visible` rings for keyboard focus without disrupting mouse users.
