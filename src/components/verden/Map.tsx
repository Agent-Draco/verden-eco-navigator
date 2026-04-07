import { useEffect, useRef, useState, Suspense } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Map as MapLibre, Marker, LngLatBounds, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation2 } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import Vehicle3D from './Vehicle3D';
import { createPortal } from 'react-dom';

interface MapProps {
  destination?: any;
  fastestRoute?: any;
  greenestRoute?: any;
  activeRoute?: any;
  userLocation?: [number, number] | null;
  userHeading?: number;
  bearing?: number; // map rotation in degrees
  speed?: number; // Added speed for dynamic camera
  vehicle?: { model: string; color: string };
}

const Map = ({
  destination,
  fastestRoute,
  greenestRoute,
  activeRoute,
  userLocation,
  userHeading = 0,
  bearing = 0,
  speed = 0,
  vehicle: propVehicle,
}: MapProps) => {
  const { theme: appTheme, selectedVehicle: appVehicle } = useApp();
  const { theme: uiTheme, systemTheme } = useTheme();
  
  const currentTheme = appTheme;
  const resolvedUITheme = uiTheme === 'system' ? systemTheme : uiTheme;
  const vehicle = propVehicle || appVehicle;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<MapLibre | null>(null);
  const userMarker = useRef<Marker | null>(null);
  const [vehiclePortal, setVehiclePortal] = useState<HTMLElement | null>(null);
  const destinationMarker = useRef<Marker | null>(null);
  const [isFollowMode, setIsFollowMode] = useState(true);
  const hasFittedRef = useRef(false);

  // ── Initialize map ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = new MapLibre({
        container: mapRef.current,
        style: {
          version: 8,
          sources: {
            'raster-tiles': {
              type: 'raster',
              tiles: [
                currentTheme === 'dark' || currentTheme === 'neon' || currentTheme === 'phoenix' || currentTheme === 'ocean' || currentTheme === 'forest' || resolvedUITheme === 'dark'
                  ? 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
                  : 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
              ],
              tileSize: 256,
              attribution: '&copy; OpenStreetMap &copy; CARTO',
            },
          },
          layers: [
            {
              id: 'simple-tiles',
              type: 'raster',
              source: 'raster-tiles',
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },
        center: userLocation ? [userLocation[1], userLocation[0]] : [77.1000, 28.5562], // Delhi fallback
        zoom: 15,
        pitch: 60,
        bearing: bearing,
      });

      mapInstance.current.addControl(new NavigationControl(), 'top-right');

      // Add branding watermark
      const logoDiv = document.createElement('div');
      logoDiv.className = 'verden-watermark';
      logoDiv.innerHTML = '<span style="font-weight:bold; color:#22c55e;">Verden</span> Maps';
      logoDiv.style.position = 'absolute';
      logoDiv.style.bottom = '10px';
      logoDiv.style.right = '10px';
      logoDiv.style.backgroundColor = 'rgba(255,255,255,0.7)';
      logoDiv.style.padding = '2px 8px';
      logoDiv.style.borderRadius = '4px';
      logoDiv.style.fontSize = '12px';
      logoDiv.style.pointerEvents = 'none';
      mapRef.current.appendChild(logoDiv);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [currentTheme]);

  // ── Follow User ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !userLocation || !isFollowMode) return;

    // Dynamic Camera: Adjust pitch and zoom based on speed (Google Maps style)
    const targetZoom = speed > 60 ? 14.5 : speed > 30 ? 15.5 : 17;
    const targetPitch = speed > 50 ? 75 : 60;

    mapInstance.current.easeTo({
      center: [userLocation[1], userLocation[0]],
      bearing: bearing,
      zoom: targetZoom,
      pitch: targetPitch,
      duration: 1200,
      easing: (t) => t * (2 - t), // Smooth ease-out
    });
  }, [userLocation, bearing, isFollowMode, speed]);

  // ── Update User Marker (3D style) ───────────────────────────────────────
  useEffect(() => {
    const map = mapInstance.current;
    if (!map || !userLocation) return;

    const el = document.createElement('div');
    el.className = 'user-marker-3d';
    el.style.width = '60px';
    el.style.height = '60px';
    el.style.pointerEvents = 'none';
    
    setVehiclePortal(el);

    if (!userMarker.current) {
      userMarker.current = new Marker({
        element: el,
        rotationAlignment: 'map',
        pitchAlignment: 'map',
      })
        .setLngLat([userLocation[1], userLocation[0]])
        .addTo(map);
    } else {
      userMarker.current.setLngLat([userLocation[1], userLocation[0]]);
    }
  }, [userLocation, bearing, vehicle]);

  // ── Handle Destination Selection ──────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !destination) return;

    const coords: [number, number] = [
      destination.geometry.coordinates[0],
      destination.geometry.coordinates[1],
    ];
    if (!destinationMarker.current) {
      destinationMarker.current = new Marker({ color: '#ef4444' })
        .setLngLat(coords)
        .addTo(mapInstance.current);
    } else {
      destinationMarker.current.setLngLat(coords);
    }

    if (!isFollowMode) {
      mapInstance.current.flyTo({
        center: coords,
        zoom: 14,
        essential: true
      });
    }
  }, [destination]);

  // ── Show Routes ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || (!fastestRoute && !greenestRoute && !activeRoute)) return;

    const map = mapInstance.current;
    
    // Function to add a high-fidelity 'Google' style route with layers
    const addRoute = (id: string, geometry: any, color: string) => {
      const casingId = `${id}-casing`;
      const innerId = `${id}-inner`;
      
      // Cleanup
      [casingId, innerId].forEach(lId => {
        if (map.getLayer(lId)) map.removeLayer(lId);
        if (map.getSource(lId)) map.removeSource(lId);
      });
      
      map.addSource(id, { type: 'geojson', data: geometry });

      // 1. Shadow/Casing Layer (Google Maps Navy)
      map.addLayer({
        id: casingId,
        type: 'line',
        source: id,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 
          'line-color': '#0d4a2e', // Deep forest/navy for depth
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 12, 18, 24],
          'line-opacity': 0.4,
        },
      });

      // 2. Vibrant Main Path
      map.addLayer({
        id: innerId,
        type: 'line',
        source: id,
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 
          'line-color': color, 
          'line-width': ['interpolate', ['linear'], ['zoom'], 12, 6, 18, 14],
          'line-opacity': 1,
        },
      });
    };

    if (activeRoute) {
      addRoute('active-route', activeRoute.geometry, '#22c55e'); // Verden Green
    }
  }, [fastestRoute, greenestRoute, activeRoute, currentTheme]);

  // ── Fit Bounds on Route Selection ─────────────────────────────────────────
  useEffect(() => {
    if ((fastestRoute || greenestRoute || activeRoute) && userLocation && destination && isFollowMode && mapInstance.current) {
      if (!hasFittedRef.current) {
        const bounds = new LngLatBounds();
        bounds.extend([userLocation[1], userLocation[0]]);
        bounds.extend([destination.geometry.coordinates[0], destination.geometry.coordinates[1]]);
        mapInstance.current.fitBounds(bounds, { padding: 80, duration: 1500 });
        hasFittedRef.current = true;
      }
    } else {
      hasFittedRef.current = false;
    }
  }, [fastestRoute, greenestRoute, activeRoute, destination, userLocation, isFollowMode]);

  // ── Handle Resize ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => {
      if (mapInstance.current) {
        mapInstance.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {!isFollowMode && (
        <button
          onClick={() => setIsFollowMode(true)}
          className="absolute bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full shadow-lg flex items-center gap-2 font-medium z-10 hover:bg-primary/90 transition-all active:scale-95"
        >
          <Navigation2 size={18} />
          Recenter
        </button>
      )}

      {/* Render the 3D Vehicle via Portal into the DOM marker element */}
      {vehiclePortal && createPortal(
        <div style={{ width: '80px', height: '80px' }}>
          <Canvas camera={{ position: [0, 5, 0], fov: 30 }}>
            <ambientLight intensity={2.0} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <Suspense fallback={null}>
              <Vehicle3D 
                model={vehicle.model} 
                color={vehicle.color} 
                rotation={userHeading} // Aligned to user heading in map space
                scale={0.9} 
              />
            </Suspense>
          </Canvas>
        </div>,
        vehiclePortal
      )}

      {/* Map specific styles */}
      <style>{`
        .maplibregl-ctrl-bottom-right { display: none; }
        .maplibregl-ctrl-bottom-left { display: none; }
        .maplibregl-canvas { 
          width: 100% !important; 
          height: 100% !important;
          filter: ${currentTheme === 'neon' ? 'saturate(2) contrast(1.2) brightness(1.1)' : 
                   currentTheme === 'phoenix' ? 'sepia(0.3) saturate(2) hue-rotate(-20deg)' : 
                   currentTheme === 'ocean' ? 'hue-rotate(20deg) saturate(1.5) contrast(1.1)' : 
                   currentTheme === 'forest' ? 'hue-rotate(-40deg) saturate(1.5)' : 
                   'saturate(1.2) contrast(1.05) brightness(0.95)'};
        }
        .verden-watermark { z-index: 1; opacity: 0.8; }
        .user-marker-3d { 
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Map;
