
## 2024-05-24 - Accessible Icon-Only Password Toggle
**Learning:** Icon-only toggles (like password visibility) need explicit `aria-label`s, `type="button"`, and `aria-hidden="true"` on the icon itself. Additionally, missing `focus-visible` styles can hide keyboard focus entirely on interactive icons.
**Action:** Always pair `focus-visible` ring utilities and explicit `aria-label`s when adding icon-only buttons to custom forms.
