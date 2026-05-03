
## 2024-05-03 - [GlassButton Accessibility Enhancements]
**Learning:** Extending `HTMLMotionProps` allows Framer Motion components to inherit native accessibility props like `disabled`. Relying on inherited props is safer and cleaner than duplicating state logic.
**Action:** Always verify inherited prop availability before adding custom accessibility state props to styled interactive components.
