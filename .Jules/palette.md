## 2024-05-18 - GlassButton Accessibility Enhancement

**Learning:** Reusable components like `GlassButton` often lack crucial interaction feedback (focus, disabled states) despite having rich custom animations. The codebase uses standard pre-defined CSS transitions (e.g., `.transition-liquid`) which should be preferred over arbitrary complex arbitrary functions (`ease-[cubic-bezier(...)]`) to maintain consistency and avoid Vite/esbuild parsing errors.
**Action:** When creating or modifying interactive elements, always explicitly include `focus-visible` ring utilities and `disabled` state utilities. Standardize animations using global CSS classes rather than arbitrary Tailwind inline functions when possible.
