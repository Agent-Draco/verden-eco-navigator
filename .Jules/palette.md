## 2025-06-09 - Accessible Focus States for Custom Nav
**Learning:** Custom `<button>` elements used as navigation links require explicit `aria-current="page"` to indicate active state and `focus-visible` utilities to ensure keyboard accessibility without disrupting mouse users.
**Action:** Always apply `aria-current` conditionally and `focus-visible:ring` to maintain accessibility.
