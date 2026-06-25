## 2026-06-25 - Navigation Accessibility Standardization
**Learning:** Custom interactive elements like bottom bars and sidebars frequently omit visual focus indicators (`focus-visible`) and semantic active states (`aria-current="page"`), making them inaccessible to keyboard and screen reader users.
**Action:** Always verify that standard navigation components use `aria-current="page"` alongside the Tailwind `focus-visible` utility pattern (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`) for keyboard and screen reader accessibility.
