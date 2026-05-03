## 2024-05-03 - Focus & Disabled States on Framer Motion Wrappers

**Learning:** When using `framer-motion` to create custom interactive elements like `motion.button` (e.g., `GlassButton`), standard HTML attributes like `disabled` and CSS pseudo-classes like `:focus-visible` must still be explicitly accounted for in the styling logic. Even though they inherit HTML attributes, they lack native browser styling cues when heavily customized.
**Action:** Always append explicit focus-visible rules (`focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-offset-2`) and disabled rules (`disabled:opacity-50 disabled:pointer-events-none`) to custom button base classes to ensure robust keyboard navigation and accessibility state indication.
