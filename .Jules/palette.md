
## 2024-07-08 - Keyboard accessibility for hover-based tooltips
**Learning:** Custom tooltips that rely on `group-hover:opacity-100` are invisible to keyboard navigators unless paired with `group-focus-visible:opacity-100`. Additionally, the parent interactive element needs explicit focus-visible styles.
**Action:** Always pair `group-hover` opacity changes with `group-focus-visible` for custom tooltips and ensure the parent has `focus-visible` outline/ring styles to maintain full accessibility.
