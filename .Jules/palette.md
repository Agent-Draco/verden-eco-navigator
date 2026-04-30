
## 2024-05-18 - Explicit Focus States for Custom Interactive Elements

**Learning:** Custom components using `motion.button` and complex pseudo-classes often lack built-in focus styling or obscure default native outlines, making keyboard navigation inaccessible.
**Action:** Always append explicit Tailwind `focus-visible` ring utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) when building `button` or interactive role-bearing components to ensure accessibility across all environments.
