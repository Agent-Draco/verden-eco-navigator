import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';
import { VehicleEntityController } from './VehicleEntityController';
import { NavigationCameraController } from './NavigationCameraController';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export interface CesiumViewerProps {
  userLocation: [number, number] | null;
  bearing: number;
  speedKmh: number;
  vehicle: { model: string; color: string };
}

const CesiumViewer: React.FC<CesiumViewerProps> = ({
  userLocation,
  bearing,
  speedKmh,
  vehicle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);
  
  const vehicleCtrlRef = useRef<VehicleEntityController | null>(null);
  const cameraCtrlRef = useRef<NavigationCameraController | null>(null);

  // 1. Initialize Viewer Lifecycle
  useEffect(() => {
    let _isMounted = true;

    const initViewer = async () => {
      if (viewerRef.current || !containerRef.current) return;

      // Allow default OSM imagery without requiring an Ion token
      Cesium.Ion.defaultAccessToken = '';
      const imageryProvider = new Cesium.OpenStreetMapImageryProvider({
          url : 'https://a.tile.openstreetmap.org/'
      });

      // Load Terrain Provider if requested
      let terrainProvider;
      try {
          terrainProvider = await Cesium.createWorldTerrainAsync();
      } catch (e) {
          console.warn("Failed to load Cesium World Terrain:", e);
      }

      if (!_isMounted) return;

      viewerRef.current = new Cesium.Viewer(containerRef.current, {
        terrainProvider,
        baseLayer: new Cesium.ImageryLayer(imageryProvider),
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
        requestRenderMode: false, // Ensure continuous rendering for live updates
      });

      // Hide default Cesium credits layout
      const creditContainer = viewerRef.current.cesiumWidget.creditContainer as HTMLElement;
      if (creditContainer) creditContainer.style.display = 'none';

      // 2. Initialize Sub-Controllers
      vehicleCtrlRef.current = new VehicleEntityController(viewerRef.current, vehicle);
      cameraCtrlRef.current = new NavigationCameraController(viewerRef.current, bearing);
      
      const entity = vehicleCtrlRef.current.getEntity();
      if (entity) {
          cameraCtrlRef.current.setTarget(entity);
      }
    };

    initViewer();

    // Cleanup viewer properly on unmount
    return () => {
      _isMounted = false;
      if (cameraCtrlRef.current) cameraCtrlRef.current.destroy();
      if (vehicleCtrlRef.current) vehicleCtrlRef.current.destroy();
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  // 3. Sync live GPS state updates to controllers smoothly
  useEffect(() => {
    if (!userLocation || !viewerRef.current) return;

    if (vehicleCtrlRef.current) {
      // Pass coordinates to vehicle entity handler for interpolation
      vehicleCtrlRef.current.updateState(userLocation[1], userLocation[0], bearing);
    }
    
    if (cameraCtrlRef.current) {
      // Pass speed and bearing to custom smoothing camera logic
      cameraCtrlRef.current.setParams(bearing, speedKmh);
    }
  }, [userLocation, bearing, speedKmh]);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default CesiumViewer;
