## 2024-05-06 - Fixing GlassButton Accessibility

**Learning:** When dealing with custom animated buttons like `GlassButton` that wrap `framer-motion` elements, native CSS pseudo-classes for accessibility states (like `focus-visible:` and `disabled:`) can be applied directly to the base Tailwind string of the component. It's an elegant way to handle states without needing complex JS logic or custom prop mapping. Also, lazy `any` casts in React event handlers (like `onClick`) can be safely resolved using a double cast `e as unknown as React.MouseEvent<HTMLButtonElement>`.
**Action:** Always add standard Tailwind `focus-visible` and `disabled` utilities to the base styles of all custom interactive elements created in the future to ensure baseline accessibility compliance.
