## 2024-05-24 - Navigation Component Accessibility

**Learning:** When building custom navigation components mapping active states (e.g. `location.pathname === path`), applying `aria-current="page"` conditionally enhances screen reader semantics significantly. Also, explicit `focus-visible` ring styling ensures keyboard accessibility without disrupting mouse users.
**Action:** Always include conditional `aria-current` and explicit `focus-visible` styles on custom interactive navigation items in React.
