
## 2024-05-02 - Standardizing Focus and Disabled States for Custom Buttons

**Learning:** When developing custom interactive components using elements like `motion.button` (e.g., `GlassButton.tsx`), it's easy to overlook native accessibility states. Without explicit Tailwind classes like `focus-visible` or `disabled`, users navigating with keyboards or screen readers lose visual cues for their interactions and disabled elements might still appear active.
**Action:** Always verify and append robust native state classes (e.g., `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none`) to the root class list of any custom button wrapper to maintain baseline accessibility alongside complex stylistic variants.
