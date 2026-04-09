import * as Cesium from 'cesium';

/**
 * NavigationCameraController.ts
 *
 * Controls the follow-camera for the navigation 3D view.
 * 
 * Features:
 * - Smoothed velocity LERP to filter GPS jitter.
 * - Predictive Lead Offset (Google Maps foresight).
 * - Speed-adaptive hybrid transform selection.
 */
export class NavigationCameraController {
  private viewer: Cesium.Viewer;
  private targetEntity: Cesium.Entity | null = null;
  private isInitialLockAcquired = false;

  // ── State for Velocity Smoothing (LERP) ──────────────────────────────────
  private smoothedVelocity = new Cesium.Cartesian3();

  constructor(viewer: Cesium.Viewer, initialHeading: number) {
    this.viewer = viewer;
    // Attach per-frame camera update
    this.viewer.scene.preUpdate.addEventListener(this.onPreUpdate);
  }

  public setTarget(entity: Cesium.Entity): void {
    this.targetEntity = entity;
  }

  /**
   * Called when a new GPS fix or bearing reading arrives.
   */
  public setParams(heading: number, speedKmh: number): void {
    // We derive heading/velocity from the position property every frame,
    // so this is currently just a placeholder if needed for other UI state.
  }

  private onPreUpdate = (): void => {
    if (!this.targetEntity || !this.viewer) return;

    const time = this.viewer.clock.currentTime;
    const position = this.targetEntity.position?.getValue(time);
    const orientation = this.targetEntity.orientation?.getValue(time);

    if (!position || !orientation) return;

    // 1. Calculate Current Velocity (Sampled over 0.1s delta)
    const prevTime = Cesium.JulianDate.addSeconds(time, -0.1, new Cesium.JulianDate());
    const prevPosition = this.targetEntity.position?.getValue(prevTime);
    
    let currentVelocity = new Cesium.Cartesian3();
    if (prevPosition) {
        currentVelocity = Cesium.Cartesian3.subtract(position, prevPosition, new Cesium.Cartesian3());
        Cesium.Cartesian3.divideByScalar(currentVelocity, 0.1, currentVelocity);
    }

    // 2. Smoothed Velocity Perspective (LERP @ 0.15)
    // Prevents GPS jitter from shaking the camera frame
    this.smoothedVelocity = Cesium.Cartesian3.lerp(
        this.smoothedVelocity,
        currentVelocity,
        0.15,
        new Cesium.Cartesian3()
    );

    const speedMs = Cesium.Cartesian3.magnitude(this.smoothedVelocity);
    const speedKmh = speedMs * 3.6;

    // 3. Predictive Lead Offset (Google Maps Foresight)
    // Anchors the camera to a point slightly ahead of where the vehicle is moving.
    const leadDistance = Cesium.Math.lerp(15, 35, Math.min(speedKmh / 120, 1.0));
    const normalizedVelocity = Cesium.Cartesian3.normalize(this.smoothedVelocity, new Cesium.Cartesian3());
    
    const leadPosition = Cesium.Cartesian3.add(
        position,
        Cesium.Cartesian3.multiplyByScalar(normalizedVelocity, leadDistance, new Cesium.Cartesian3()),
        new Cesium.Cartesian3()
    );

    // 4. Hybrid Frame Selection: Velocity vs Orientation
    // Fallback to direct orientation at intersections (low speed) for stability.
    let finalOrientation = orientation;
    if (speedKmh > 5 && !Cesium.Cartesian3.equals(this.smoothedVelocity, Cesium.Cartesian3.ZERO)) {
        try {
            finalOrientation = Cesium.Quaternion.fromRotationMatrix(
                Cesium.Transforms.rotationMatrixFromPositionVelocity(position, this.smoothedVelocity)
            );
        } catch (e) {
            // Fallback if velocity is parallel to up vector
            finalOrientation = orientation;
        }
    }

    // 5. Apply lookAtTransform in the local coordinate system
    // Using the leadPosition for foresight if moving fast enough
    const targetAnchor = speedKmh > 5 ? leadPosition : position;
    const transformMatrix = Cesium.Matrix4.fromRotationTranslation(
        Cesium.Matrix3.fromQuaternion(finalOrientation),
        targetAnchor
    );

    const cameraDistance = Cesium.Math.lerp(35, 80, Math.min(speedKmh / 120, 1.0));
    const cameraHeight = Cesium.Math.lerp(20, 45, Math.min(speedKmh / 120, 1.0));

    // One-time initial lock acquisition
    if (!this.isInitialLockAcquired) {
        this.viewer.camera.flyTo({
            destination: Cesium.Matrix4.multiplyByPoint(
                transformMatrix, 
                new Cesium.Cartesian3(-cameraDistance, 0, cameraHeight), 
                new Cesium.Cartesian3()
            ),
            orientation: {
                heading: 0,
                pitch: Cesium.Math.toRadians(-62),
                roll: 0
            },
            duration: 1.5,
            complete: () => { this.isInitialLockAcquired = true; }
        });
        return;
    }

    // Continuous Frame Lock
    this.viewer.camera.lookAtTransform(
        transformMatrix,
        new Cesium.Cartesian3(-cameraDistance, 0, cameraHeight)
    );
  };

  public destroy(): void {
    if (this.viewer) {
        this.viewer.scene.preUpdate.removeEventListener(this.onPreUpdate);
        // Release camera back to free interaction
        this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }
  }
}
