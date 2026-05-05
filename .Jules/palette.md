
## 2024-05-18 - Ensure Robust Native Keyboard Accessibility and Interaction States for Custom Interactive Components

**Learning:** Custom interactive wrappers built on elements like `button` or `div` (e.g., using Framer Motion's `motion.button`) sometimes lack native visual feedback states, hindering accessibility and usability. Relying solely on javascript event blocking without native attributes (like `disabled`) leaves keyboard users without clear signals.

**Action:** Always explicitly define native focus states using Tailwind CSS's `focus-visible` pseudo-class (e.g., `focus-visible:ring-primary focus-visible:ring-offset-background`), apply clear visual styling for disabled states (e.g., `disabled:opacity-50 disabled:pointer-events-none`), and ensure inherited `disabled` attributes are correctly passed to the underlying DOM element for robust screen-reader and keyboard compatibility.
