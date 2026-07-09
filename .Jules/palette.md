## 2024-05-18 - Keyboard accessibility for hover tooltips

**Learning:** Tooltips relying on `group-hover:opacity-100` must also include `group-focus-visible:opacity-100` alongside focus rings on the parent element to maintain full keyboard accessibility.
**Action:** Always pair hover-based visibility styles with focus-visible counterparts when implementing custom interactive elements.
