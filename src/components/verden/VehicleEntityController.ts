/**
 * VehicleEntityController.ts
 *
 * Manages the Cesium entity representing the user's vehicle during navigation.
 *
 * Key updates:
 * - Unity➔Cesium alignment (+Z forward, +Y up) via nodeTransformations.
 * - SampledPositionProperty + VelocityOrientationProperty for stable 3D motion.
 * - Explicit terrain height management (avoids CLAMP_TO_GROUND instabilities).
 */

import * as Cesium from 'cesium';
import { MODEL_URLS } from './Vehicle3D';

export class VehicleEntityController {
  private viewer: Cesium.Viewer;
  private entity: Cesium.Entity | null = null;
  private positionProperty: Cesium.SampledPositionProperty;

  /** Tracks whether this is the very first GPS sample (needs twin anchoring) */
  private isFirstSample = true;

  /** Last known compass heading in degrees (0 = North, clockwise) */
  private lastHeadingDeg = 0;

  constructor(viewer: Cesium.Viewer, vehicle: { model: string; color: string }) {
    this.viewer = viewer;

    // ── Position property (smooth interpolation) ─────────────────────────────
    this.positionProperty = new Cesium.SampledPositionProperty();

    // Hold the last/first known position instead of returning undefined
    this.positionProperty.forwardExtrapolationType = Cesium.ExtrapolationType.HOLD;
    this.positionProperty.backwardExtrapolationType = Cesium.ExtrapolationType.HOLD;

    // Linear interpolation is most stable for real-time GPS tracks
    this.positionProperty.setInterpolationOptions({
      interpolationDegree: 1,
      interpolationAlgorithm: Cesium.LinearApproximation,
    });

    // ── Vehicle entity ───────────────────────────────────────────────────────
    const url = MODEL_URLS[vehicle.model] || MODEL_URLS.sedan;

    this.entity = this.viewer.entities.add({
      name: 'Navigation Vehicle',
      position: this.positionProperty,
      // DYNAMIC orientation driven by velocity changes. This MUST be the only
      // source of rotation for the entity itself.
      orientation: new Cesium.VelocityOrientationProperty(this.positionProperty),

      model: {
        uri: url,
        minimumPixelSize: 64, // Baseline visibility
        maximumScale: 20000,

        // STATIC correction for the model's intrinsic orientation.
        // This rotates the model within its own reference frame to align it
        // with Cesium's East-North-Up (ENU) convention (X-forward).
        nodeTransformations: {
          root: {
            rotation: Cesium.Quaternion.fromHeadingPitchRoll(
              new Cesium.HeadingPitchRoll(
                Cesium.Math.toRadians(90), // Align model's original Y-forward to Cesium's X-forward
                0,
                Cesium.Math.toRadians(90)  // Align model's original Z-up to Cesium's Y-up
              )
            ),
          },
        },

        // Silhouette for premium edge visibility
        silhouetteColor: Cesium.Color.WHITE.withAlpha(0.6),
        silhouetteSize: 1.0,
      },
    });

    // Set as tracked entity for automatic LOD and visibility priority baseline
    this.viewer.trackedEntity = this.entity;

    // Ensure Cesium's clock animates so interpolation runs every frame
    this.viewer.clock.shouldAnimate = true;
    this.viewer.clock.multiplier = 1.0;
  }

  /**
   * updateState
   * -----------
   * Call this every time a new GPS fix arrives.
   *
   * @param lng        Longitude in decimal degrees
   * @param lat        Latitude in decimal degrees
   * @param headingDeg Compass bearing 0–360 (0 = North, clockwise)
   */
  public async updateState(lng: number, lat: number, headingDeg: number): Promise<void> {
    if (!this.entity) return;
    this.lastHeadingDeg = headingDeg;

    const now = Cesium.JulianDate.now();
    
    // 1. Terrain Sampling for TRUE 3D Height (fixes VelocityOrientation stability)
    let height = 0;
    try {
        const cartographic = Cesium.Cartographic.fromDegrees(lng, lat);
        const updated = await Cesium.sampleTerrainMostDetailed(
            this.viewer.terrainProvider, 
            [cartographic]
        );
        height = updated[0].height || 0;
    } catch (e) {
        console.warn("Terrain sampling failed, falling back to 0");
    }

    const position = Cesium.Cartesian3.fromDegrees(lng, lat, height);

    if (this.isFirstSample) {
      const pastTime = Cesium.JulianDate.addSeconds(now, -0.5, new Cesium.JulianDate());
      const futureTime = Cesium.JulianDate.addSeconds(now, 1.0, new Cesium.JulianDate());
      
      this.positionProperty.addSample(pastTime, position);
      this.positionProperty.addSample(futureTime, position);
      this.isFirstSample = false;
    } else {
      const futureTime = Cesium.JulianDate.addSeconds(now, 1.0, new Cesium.JulianDate());
      this.positionProperty.addSample(futureTime, position);
    }
  }

  /** Returns the Cesium entity for external reference (e.g. camera target). */
  public getEntity(): Cesium.Entity | null {
    return this.entity;
  }

  /** Returns the latest reported compass heading in degrees. */
  public getLastHeadingDeg(): number {
    return this.lastHeadingDeg;
  }

  /** Removes the entity from the viewer and frees resources. */
  public destroy(): void {
    if (this.entity) {
      this.viewer.entities.remove(this.entity);
      this.entity = null;
    }
  }
}
