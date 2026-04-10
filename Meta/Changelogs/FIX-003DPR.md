### Original Code (`src/pages/Home.tsx`)

```typescript
// ── Sync Navbar Visibility ────────────────────────────────────────────────
useEffect(() => {
  setNavHidden(isOverlayOpen);
}, [isOverlayOpen, setNavHidden]);
```

### Modified Code (`src/pages/Home.tsx`)

```typescript
// ── Sync Navbar Visibility ────────────────────────────────────────────────
useEffect(() => {
  setNavHidden(isOverlayOpen);
}, [isOverlayOpen]);
```
