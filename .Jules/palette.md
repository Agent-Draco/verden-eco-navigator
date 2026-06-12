## 2024-06-11 - Add focus-visible and aria-current to navigation buttons
**Learning:** Custom UI elements like icon-only navigation bars often lack proper focus states and semantic active state indicators (`aria-current`), degrading keyboard and screen reader accessibility.
**Action:** Always ensure custom button elements include `focus-visible` ring styling and dynamic `aria-current="page"` attributes to support keyboard navigation and assistive technologies.
