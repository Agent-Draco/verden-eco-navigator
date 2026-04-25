## 2024-04-25 - Custom Component Focus States and Transitions

**Learning:** When building custom interactive components like `GlassButton` (often `motion.button` or similar wrappers), native focus states are easily overlooked. Additionally, Vite/esbuild CSS compilation can fail or match ambiguously when arbitrary complex timing functions (`ease-[cubic-bezier(...)]`) are used directly in Tailwind classes.

**Action:** Always explicitly define native focus states using Tailwind's `focus-visible` pseudo-class (e.g., `focus-visible:ring-primary focus-visible:ring-offset-background`) for custom interactive components to ensure keyboard accessibility. Rely on predefined transition classes (like `.transition-liquid`) instead of inline arbitrary complex timing functions.
