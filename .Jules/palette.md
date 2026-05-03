## 2024-05-03 - Focus & Disabled States on Framer Motion Wrappers
**Learning:** When using `framer-motion` to wrap standard HTML elements like `<button>` (e.g., `motion.button`), native HTML attributes like `disabled` and native pseudo-classes like `:focus-visible` are fully inherited and supported.
**Action:** Always prefer applying standard Tailwind utility classes (`focus-visible:ring-... disabled:opacity-...`) directly to the base class list of these custom wrappers rather than re-implementing complex custom states or passing duplicate props, ensuring a clean and accessible UX pattern.
