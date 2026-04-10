import * as Cesium from 'cesium';

export class NavigationCameraController {
  private viewer: Cesium.Viewer;
  private targetEntity: Cesium.Entity | null = null;
  
  // State for smoothing parameters
  private currentHeading: number;
  private targetHeading: number = 0;
  private currentSpeedKmh: number = 0;

  constructor(viewer: Cesium.Viewer, initialHeading: number) {
    this.viewer = viewer;
    this.currentHeading = initialHeading;
    this.targetHeading = initialHeading;
    
    // Subscribe to the pre-update event for custom tracking
    this.viewer.scene.preUpdate.addEventListener(this.updateCamera);
  }

  public setTarget(entity: Cesium.Entity) {
    this.targetEntity = entity;
  }

  public setParams(heading: number, speedKmh: number) {
    this.targetHeading = heading;
    this.currentSpeedKmh = speedKmh;
  }

  private updateCamera = () => {
    if (!this.targetEntity) return;

    // Use current Cesium clock time for matching interpolated position
    const time = this.viewer.clock.currentTime;
    const positionProperty = this.targetEntity.position as Cesium.SampledPositionProperty;
    if (!positionProperty) return;

    const position = positionProperty.getValue(time);
    if (!position) return;

    // Antenna/Heading Smoothing to anticipate turns smoothly without jerky snapping
    let diff = this.targetHeading - this.currentHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    // Low-pass filter for smooth transitions during GPS jitter
    this.currentHeading += diff * 0.04;
    if (this.currentHeading < 0) this.currentHeading += 360;
    if (this.currentHeading >= 360) this.currentHeading -= 360;

    // Dynamic Camera Scaling based on speed
    const speedRatio = Math.max(0, Math.min(this.currentSpeedKmh / 120, 1.0));
    
    // Pitch constraints: between 55 and 70 dynamically
    const minPitch = 55;
    const maxPitch = 70;
    
    // Distance scaling
    const minDistance = 20;
    const maxDistance = 60;

    const targetPitch = minPitch + (maxPitch - minPitch) * speedRatio;
    const targetDistance = minDistance + (maxDistance - minDistance) * speedRatio;

    const headingRad = Cesium.Math.toRadians(this.currentHeading);
    const pitchRad = Cesium.Math.toRadians(-targetPitch); // negative for lookAt downward pitch

    // Apply strict Follow-Camera constraints mapped to the vehicle
    this.viewer.camera.lookAt(
      position,
      new Cesium.HeadingPitchRange(headingRad, pitchRad, targetDistance)
    );
  };

  public destroy() {
    this.viewer.scene.preUpdate.removeEventListener(this.updateCamera);
    this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
  }
}
