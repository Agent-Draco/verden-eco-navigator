# Changelog DPR [NAV-004]

## Home.tsx
```diff
+ useEffect(() => {
+   setNavHidden(isOverlayOpen);
+ }, [isOverlayOpen, setNavHidden]);
...
- onClick={() => { setIsOverlayOpen(true); setNavHidden(true); }}
+ onClick={() => { setIsOverlayOpen(true); }}
```

## BottomNav.tsx
```diff
- if (isNavHidden || location.pathname === '/navigation') return null;
+ if (isNavHidden || location.pathname === '/navigation' || location.pathname === '/navigation-dev') return null;
```

## CesiumViewer.tsx
```diff
- Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, (c.height || 0) + 0.2)
+ Cesium.Cartesian3.fromRadians(c.longitude, c.latitude, (c.height || 0) + 0.5)
...
- depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ ... })
+ depthFailMaterial: Cesium.Color.CYAN.withAlpha(0.3)
```
