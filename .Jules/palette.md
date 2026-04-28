## 2026-04-28 - Avoid Complex Timing Functions in Utility Classes and Enforce Explicit Focus States

**Learning:** Arbitrary complex timing functions in Tailwind utility classes (e.g., `ease-[cubic-bezier(...)]`) can fail to compile in Vite due to ambiguity with standard `@apply` statements in CSS modules or global stylesheets. Additionally, custom interactive elements, like generic buttons styled purely with CSS (`GlassButton`), must explicitly state focus behaviors to be robustly keyboard accessible.

**Action:** Standardize easing functions within predefined CSS classes (like `.transition-liquid`) instead of using them directly in utility class strings. Always explicitly define `focus-visible` styles (`focus-visible:outline-none focus-visible:ring-2 ...`) for custom UI components to ensure accessibility across different browsers and keyboard navigation scenarios.
