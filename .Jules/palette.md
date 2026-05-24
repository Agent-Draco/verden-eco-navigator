## 2026-05-24 - Enhance Keyboard Navigation Accessibility
**Learning:** Adding explicit focus-visible Tailwind classes (`focus-visible:ring-2`) and dynamic `aria-current="page"` attributes to custom navigation components greatly improves keyboard and screen reader accessibility without disrupting the visual experience for mouse users.
**Action:** Always verify that interactive custom components (like buttons and nav items) define visible focus states and communicate their active state semantically.
## 2026-05-24 - CI Build Error Mitigation
**Learning:** In strict build environments like esbuild/Vite, mismatched JSX tags or unescaped/ambiguous Tailwind arbitrary values (like `ease-[cubic-bezier(...)]`) will cause fatal build errors. Additionally, incorrectly assuming default exports for components that use named exports (like `GlassButton`) will block production builds.
**Action:** Always run `npm run build` locally after making changes, and double-check component export signatures before importing them into new files.
