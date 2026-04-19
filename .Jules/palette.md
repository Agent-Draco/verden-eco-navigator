## 2026-04-19 - Focus States for Framer Motion Components

**Learning:** Custom interactive components, especially those wrapped in animation libraries like `framer-motion` (`motion.button`, `motion.div`), often lack native focus indicators out of the box. Tailwind's `focus-visible` is essential to meet accessibility standards and provide clear keyboard navigation without affecting mouse users.
**Action:** Always append `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background` to custom buttons and interactive elements, along with `disabled:opacity-50 disabled:pointer-events-none`.
