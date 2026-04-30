
## 2024-03-24 - Explicit Focus and Aria Labels on Custom Components
**Learning:** Custom interactive components (like `GlassButton`) built with `motion.button` or wrappers often miss native focus states and accessible labels when used for icons. Arbitrary CSS timing functions can also cause Vite/esbuild compilation ambiguities.
**Action:** Always append Tailwind `focus-visible` ring utilities (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-background`) and disabled state styles (`disabled:opacity-50 disabled:pointer-events-none`) to custom buttons. Use predefined `.transition-liquid` classes instead of inline arbitrary bezier curves, and dynamically fallback `aria-label` to string children when explicit labels are omitted.
