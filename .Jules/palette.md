## 2025-07-05 - Semantic ARIA and Focus Visibility in Navigation

**Learning:** Missing `aria-current="page"` and explicit `focus-visible` styles on custom React Router navigation components prevents screen readers from announcing active routes and makes keyboard navigation invisible to users.
**Action:** Always apply `aria-current={active ? "page" : undefined}` alongside the Tailwind `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` pattern to custom interactive navigation elements.
