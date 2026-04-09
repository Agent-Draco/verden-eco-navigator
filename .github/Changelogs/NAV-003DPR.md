# Changelog DPR [NAV-003]

## App.tsx
```diff
+ const NavigationScreen = lazy(() => import("@/pages/NavigationScreen"));
...
- <Route path="/navigation" element={<AuthLayout><Navigation /></AuthLayout>} />
+ <Route path="/navigation-dev" element={<AuthLayout><NavigationScreen /></AuthLayout>} />
```

## VehicleEntityController.ts
```diff
- heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
+ // Manual terrain sampling used instead of CLAMP_TO_GROUND
...
+ nodeTransformations: {
+   'root': {
+     rotation: new Cesium.ConstantProperty(correctionQuaternion)
+   }
+ },
```

## NavigationCameraController.ts
```diff
- this.viewer.camera.lookAt(...)
+ this.viewer.camera.lookAtTransform(transformMatrix, new Cesium.Cartesian3(-cameraDistance, 0, cameraHeight))
...
+ smoothedVelocity = Cesium.Cartesian3.lerp(this.smoothedVelocity, currentVelocity, 0.15, ...)
```

## CesiumViewer.tsx
```diff
+ useEffect(() => {
+   // Manual terrain sampling for route coordinates
+   const sampled = await Cesium.sampleTerrainMostDetailed(viewer.terrainProvider, cartographics);
+   // Glow + depthFail materials
+   polyline: { positions, material: glow, depthFailMaterial: dash }
+ }, [route]);
```

## NavigationScreen.tsx
```diff
- <CesiumViewer ... />
+ <CesiumViewer ... route={route} />
```
