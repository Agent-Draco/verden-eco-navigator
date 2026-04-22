
## 2024-05-14 - Keyboard Accessibility in Custom Motion Buttons
**Learning:** Reusable interactive components relying on `framer-motion` (e.g., `<motion.button>`) frequently lose native focus visibility, causing poor keyboard navigation. Also, arbitrary CSS timing functions like `ease-[cubic-bezier(0.23,1,0.32,1)]` may cause Vite compiler issues.
**Action:** Always include Tailwind's `focus-visible:ring-*` utilities and `disabled` states on custom buttons to ensure full accessibility and clear state feedback. Prefer standard timing classes like `ease-out`.
