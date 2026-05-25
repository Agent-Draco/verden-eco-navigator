## 2025-05-24 - GlassButton Accessibility & Framer Motion Integration

**Learning:** When using Framer Motion's `whileTap` for interactive components alongside standard CSS/Tailwind, conflicting classes like `active:scale-95` must be removed to avoid uncoordinated UI scaling. Additionally, setting `disabled` directly on the `<motion.button>` rather than relying purely on CSS pointers helps ensure accessibility states are correctly broadcasted. `focus-visible` must be explicit to avoid outline loss.
**Action:** Always verify `whileTap` logic doesn't conflict with native `active` states or `disabled` interaction loops in animated custom buttons. Include `focus-visible:ring-2` to ensure keyboard accessibility.
