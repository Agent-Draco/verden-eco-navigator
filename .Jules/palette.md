## 2024-05-24 - Navigation Accessibility Enhancements
**Learning:** Navigation buttons often lack explicit keyboard focus indicators (`focus-visible`) and screen reader context (`aria-current`), relying only on visual cues or hover states.
**Action:** Always apply `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` to interactive navigation elements and `aria-current={active ? 'page' : undefined}` for active page links to ensure keyboard and screen reader accessibility without disrupting mouse users.
