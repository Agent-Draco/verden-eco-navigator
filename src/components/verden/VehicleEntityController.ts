import * as Cesium from 'cesium';
import { MODEL_URLS } from './Vehicle3D';

export class VehicleEntityController {
  private viewer: Cesium.Viewer;
  private entity: Cesium.Entity | null = null;
  private positionProperty: Cesium.SampledPositionProperty;
  private orientationProperty: Cesium.SampledProperty;

  constructor(viewer: Cesium.Viewer, vehicle: { model: string; color: string }) {
    this.viewer = viewer;
    this.positionProperty = new Cesium.SampledPositionProperty();
    // Forward extrapolation prevents disappearing if GPS drops temporarily
    this.positionProperty.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD;
    
    this.orientationProperty = new Cesium.SampledProperty(Cesium.Quaternion);
    this.orientationProperty.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD;

    const url = MODEL_URLS[vehicle.model] || MODEL_URLS.sedan;

    this.entity = this.viewer.entities.add({
      name: 'Navigation Vehicle',
      position: this.positionProperty,
      orientation: this.orientationProperty,
      model: {
        uri: url,
        minimumPixelSize: 64,
        maximumScale: 50,
      },
    });
  }

  public updateState(lng: number, lat: number, heading: number) {
    if (!this.entity) return;

    // In a real-time system, add the sample slightly in the future
    // so the Cesium clock (which is real-time) interpolates smoothly towards it.
    // Assuming 1s between GPS pings, a 0.5s-1s offset is stable against jitter.
    const time = Cesium.JulianDate.addSeconds(Cesium.JulianDate.now(), 0.5, new Cesium.JulianDate());
    
    // Attempt to use globe height for terrain
    let height = 0;
    if (this.viewer.scene.globe && this.viewer.terrainProvider) {
      const cartographic = Cesium.Cartographic.fromDegrees(lng, lat);
      height = this.viewer.scene.globe.getHeight(cartographic) || 0;
    }
    
    const position = Cesium.Cartesian3.fromDegrees(lng, lat, height);
    this.positionProperty.addSample(time, position);

    // Apply heading rotation using HeadingPitchRoll
    const hpr = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(-heading + 90), 0, 0); 
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
    this.orientationProperty.addSample(time, orientation);
  }

  public getEntity() {
    return this.entity;
  }

  public destroy() {
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
    }
  }
}
