import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import { MODEL_URLS } from './Vehicle3D';

export interface CesiumMapProps {
  userLocation: [number, number] | null; // [lng, lat]
  bearing?: number; // User heading in degrees
  speed?: number; // Speed in scale
  isFollowMode: boolean;
  vehicle: { model: string; color: string };
  onSyncToMapLibre?: () => void;
}

const CesiumMap: React.FC<CesiumMapProps> = ({
  userLocation,
  bearing = 0,
  speed = 0,
  isFollowMode,
  vehicle,
}) => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  const entityRef = useRef<Cesium.Entity | null>(null);
  const positionProperty = useRef<Cesium.SampledPositionProperty | null>(null);

  useEffect(() => {
    const initCesium = async () => {
      if (!viewerRef.current && cesiumContainer.current) {
        
        Cesium.Ion.defaultAccessToken = ''; // Needs a default access token if using Cesium ion assets. We'll use default offline maps or OSM.
        
        // Use basic OSM instead of Cesium Ion default imagery to avoid token issues
        const imageryProvider = new Cesium.OpenStreetMapImageryProvider({
            url : 'https://a.tile.openstreetmap.org/'
        });

        viewerRef.current = new Cesium.Viewer(cesiumContainer.current, {
          terrainProvider: await Cesium.createWorldTerrainAsync(),
          baseLayer: false, // Disabling default imagery for now since we're using OSM
          animation: false,
          timeline: false,
          navigationHelpButton: false,
          fullscreenButton: false,
          homeButton: false,
          baseLayerPicker: false,
          geocoder: false,
          sceneModePicker: false,
          infoBox: false,
          selectionIndicator: false,
        });

        const creditContainer = viewerRef.current.cesiumWidget.creditContainer as HTMLElement;
        if (creditContainer) creditContainer.style.display = 'none';

        positionProperty.current = new Cesium.SampledPositionProperty();
      }
    };
    initCesium();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!viewerRef.current || !userLocation) return;
    const viewer = viewerRef.current;
    
    // GPS ping time
    const time = Cesium.JulianDate.now();
    const pos = Cesium.Cartesian3.fromDegrees(userLocation[0], userLocation[1], 0);

    if (positionProperty.current) {
      positionProperty.current.addSample(time, pos);
    }

    if (!entityRef.current) {
      const url = MODEL_URLS[vehicle.model] || MODEL_URLS.sedan;

      entityRef.current = viewer.entities.add({
        name: 'User Vehicle',
        position: positionProperty.current,
        orientation: new Cesium.VelocityOrientationProperty(positionProperty.current),
        model: {
          uri: url,
          minimumPixelSize: 64,
          maximumScale: 50,
        },
      });

      viewer.trackedEntity = entityRef.current;
    } else {
      const url = MODEL_URLS[vehicle.model] || MODEL_URLS.sedan;
      if (entityRef.current.model) {
        entityRef.current.model.uri = new Cesium.ConstantProperty(url) as any;
      }
    }
  }, [userLocation, vehicle]);

  useEffect(() => {
    if (!viewerRef.current || !entityRef.current) return;
    const viewer = viewerRef.current;

    if (isFollowMode) {
      viewer.trackedEntity = entityRef.current;
      
      const targetDistance = speed > 50 ? -50.0 : -30.0;
      const targetHeight = speed > 50 ? 25.0 : 15.0;
      
      if (entityRef.current) {
          entityRef.current.viewFrom = new Cesium.ConstantPositionProperty(
            new Cesium.Cartesian3(targetDistance, 0.0, targetHeight)
          ) as any;
      }
    } else {
      viewer.trackedEntity = undefined;
    }
  }, [isFollowMode, speed]);

  return (
    <div ref={cesiumContainer} className="w-full h-full" />
  );
};

export default CesiumMap;
