## 2024-05-18 - Keyboard Accessible Custom Tooltips
**Learning:** Custom tooltip-like labels that rely on group-hover often fail keyboard accessibility because they don't appear on focus.
**Action:** Always pair group-hover:opacity-100 with group-focus-visible:opacity-100 (and ensure the parent button has focus-visible ring styles) to guarantee keyboard navigators can read the labels.
