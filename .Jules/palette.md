
## 2024-05-18 - GlassButton Keyboard Accessibility

**Learning:** When using Framer Motion's `motion.button` and building custom UI components (like `GlassButton`), standard keyboard focus states are often overlooked or overridden by global resets, making them invisible to keyboard-only users. Resolving ESLint `@typescript-eslint/no-explicit-any` errors in React event handlers sometimes requires casting through `unknown` first (e.g., `e as unknown as React.MouseEvent<HTMLButtonElement>`).
**Action:** Always explicitly define `focus-visible` utility classes (e.g., `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`) in the base styles of reusable custom button components to ensure consistent keyboard accessibility across the application without affecting mouse interactions. When removing `any` type casts, safely cast through `unknown`.
