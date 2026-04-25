## 2026-04-25 - GlassButton Keyboard Focus & Transition Maintenance

**Learning:** Custom components using `motion.button` and specific glassmorphic styles can easily miss standard keyboard focus outlines, rendering them inaccessible to keyboard users. Furthermore, using complex arbitrary timing functions (like `ease-[cubic-bezier(0.23,1,0.32,1)]`) inline with Tailwind can cause Vite CSS compilation ambiguity/errors.
**Action:** Always append `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background` to interactive custom components. For standard complex transitions, rely on predefined classes like `.transition-liquid` defined in `src/index.css` rather than inline arbitrary values.
