## 2024-05-03 - Added Focus Visible and Disabled States to GlassButton

**Learning:** When using Framer Motion's `<motion.button>` combined with Tailwind CSS, inherited HTML attributes like `disabled` are still fully supported and should be leveraged for styling states using Tailwind's `disabled:opacity-50 disabled:pointer-events-none` utility classes instead of creating custom React component props.

**Action:** Consistently utilize Tailwind's native pseudo-class modifiers (`focus-visible:`, `disabled:`) for standard interactive component states to ensure robust accessibility with minimal code overhead.
