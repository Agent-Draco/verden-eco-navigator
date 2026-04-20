## 2024-05-18 - Keyboard Accessibility on Custom Interactive Components

**Learning:** When building highly customized interactive components (like `GlassButton` with Framer Motion and custom styling), native browser focus outlines are often removed or become invisible against complex backgrounds. Furthermore, arbitrary complex timing functions in Tailwind (e.g., `ease-[cubic-bezier(...)]`) can sometimes cause ambiguous utility matching issues in Vite builds.

**Action:** Consistently apply explicit `focus-visible` styling (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) to all custom button and interactive wrapper components to ensure robust keyboard navigation accessibility. Also, prefer standard CSS transition timing keywords (like `ease-out`) over complex arbitrary values in class names to ensure smooth and predictable builds across all build tools.
