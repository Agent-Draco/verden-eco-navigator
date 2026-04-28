
## 2024-05-18 - Explicit Focus States for Custom Interactive Components

**Learning:** When building highly custom interactive components (like GlassButton which relies on heavy gradients and structural CSS), the native browser focus rings are often obscured or missing entirely, making keyboard navigation difficult to track.
**Action:** Always explicitly define focus-visible states using Tailwind's `focus-visible:` pseudo-class (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background`) on any custom component acting as a button or link to maintain accessibility standards without breaking visual design for mouse users.
