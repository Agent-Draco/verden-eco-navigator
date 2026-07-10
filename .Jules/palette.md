## 2024-07-10 - Keyboard Accessible Tooltips
**Learning:** Custom tooltips that rely on `group-hover:opacity-100` are invisible to keyboard users who navigate via the Tab key unless they are paired with `group-focus-visible:opacity-100`.
**Action:** Always pair `group-hover` visibility toggles with `group-focus-visible` and ensure the parent button has clear `focus-visible` outline styles.
