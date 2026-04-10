### Original Code (`src/components/verden/VehicleEntityController.ts`)

```typescript
// Unity to Cesium Frame Alignment: +Z forward -> +X forward
const correctionMatrix = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(-90));
const correctionQuaternion = Cesium.Quaternion.fromRotationMatrix(correctionMatrix);

this.entity = this.viewer.entities.add({
  // ...
  model: {
    // ...
    nodeTransformations: {
      'root': {
        rotation: new Cesium.ConstantProperty(correctionQuaternion)
      }
    },
  // ...
  },
});
```

### Modified Code (`src/components/verden/VehicleEntityController.ts`)

```typescript
// Correction for Blender/Unity's coordinate system (Y-up, Z-forward)
// to Cesium's (Z-up, X-forward)
const heading = Cesium.Math.toRadians(90);
const pitch = 0;
const roll = Cesium.Math.toRadians(90);
const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
const correctionQuaternion = Cesium.Transforms.headingPitchRollQuaternion(
  Cesium.Cartesian3.fromDegrees(0, 0, 0), // Center of the model
  hpr
);

this.entity = this.viewer.entities.add({
  // ...
  model: {
    // ...
    nodeTransformations: {
      'root': {
        rotation: new Cesium.ConstantProperty(correctionQuaternion)
      }
    },
  // ...
  },
});
```
