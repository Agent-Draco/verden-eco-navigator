## 2026-04-20 - [Focus-Visible Accessibilty]

**Learning:** Custom components using motion wrappers (like Framer Motion) or heavily styled wrappers often lack native focus states out-of-the-box. Additionally, arbitrary complex timing functions in Tailwind (like `ease-[cubic-bezier(...)]`) can cause CSS compilation failures or be overly specific.
**Action:** When creating custom interactive elements, always explicitly define keyboard focus states using Tailwind's `focus-visible:outline-none focus-visible:ring-2` pattern with appropriate primary and offset colors. Use standard named easing classes like `ease-out` for better compatibility and performance unless a specific bezier curve is strictly necessary and handled in a separate stylesheet.
