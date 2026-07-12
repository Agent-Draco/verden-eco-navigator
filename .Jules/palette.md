## 2024-07-12 - Keyboard Accessibility in Custom Navigations
**Learning:** Custom tooltips built with `group-hover` often forget `group-focus-visible` leaving keyboard users without labels.
**Action:** Always add `group-focus-visible` to custom tooltips and `aria-label`/`aria-hidden="true"` to icon buttons.
