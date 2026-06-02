## 2025-06-02 - Custom Navigation Accessibility
**Learning:** Custom navigation links lack built-in accessibility features compared to native `<a>` elements or standard `NavLink` components.
**Action:** Always add `aria-current="page"` conditionally for the active state and explicit `focus-visible` outline classes to custom navigation buttons to ensure keyboard navigability and semantic meaning.
