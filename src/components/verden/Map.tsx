import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import { Map as MapLibre, Marker, LngLatBounds, NavigationControl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation2 } from 'lucide-react';

interface MapProps {
  destination?: any;
  fastestRoute?: any;
  greenestRoute?: any;
  userLocation?: [number, number] | null;
  userHeading?: number;
  bearing?: number; // map rotation in degrees
}

const Map = ({
  destination,
  fastestRoute,
  greenestRoute,
  userLocation,
  bearing = 0,
}: MapProps) => {
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<MapLibre | null>(null);
  const userMarker = useRef<Marker | null>(null);
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
                currentTheme === 'dark'
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

    mapInstance.current.easeTo({
      center: [userLocation[1], userLocation[0]],
      bearing: bearing,
      duration: 1000,
      pitch: 60,
    });
  }, [userLocation, bearing, isFollowMode]);

  // ── Update User Marker (Waze style) ───────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current || !userLocation) return;

    const el = document.createElement('div');
    el.className = 'user-marker-waze';
    el.style.width = '40px';
    el.style.height = '40px';
    
    // Waze-like car avatar (SVG)
    const wazeCarHtml = `
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(${bearing}deg); transition: transform 0.3s ease-out;">
        <circle cx="20" cy="20" r="18" fill="rgba(34, 197, 94, 0.2)" stroke="#22c55e" stroke-width="2"/>
        <path d="M20 10L26 26L20 23L14 26L20 10Z" fill="#22c55e" stroke="white" stroke-width="2" stroke-linejoin="round"/>
      </svg>
    `;
    el.innerHTML = wazeCarHtml;

    if (!userMarker.current) {
      userMarker.current = new Marker({
        element: el,
        rotationAlignment: 'map',
      })
        .setLngLat([userLocation[1], userLocation[0]])
        .addTo(mapInstance.current);
    } else {
      userMarker.current.setLngLat([userLocation[1], userLocation[0]]);
      const svg = userMarker.current.getElement().querySelector('svg');
      if (svg) svg.style.transform = `rotate(${bearing}deg)`;
    }
  }, [userLocation, bearing]);

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
    if (!mapInstance.current || (!fastestRoute && !greenestRoute)) return;

    const map = mapInstance.current;
    
    // Clean up existing routes
    ['fastest-route', 'greenest-route'].forEach(id => {
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);
    });

    if (fastestRoute) {
      map.addSource('fastest-route', {
        type: 'geojson',
        data: fastestRoute.geometry,
      });
      map.addLayer({
        id: 'fastest-route',
        type: 'line',
        source: 'fastest-route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#3b82f6', 'line-width': 6 },
      });
    }
  }, [fastestRoute, greenestRoute]);

  // ── Fit Bounds on Route Selection ─────────────────────────────────────────
  useEffect(() => {
    if ((fastestRoute || greenestRoute) && userLocation && destination && isFollowMode && mapInstance.current) {
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
  }, [fastestRoute, greenestRoute, destination, userLocation, isFollowMode]);

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

      {/* Map specific styles */}
      <style>{`
        .maplibregl-ctrl-bottom-right { display: none; }
        .maplibregl-ctrl-bottom-left { display: none; }
        .maplibregl-canvas { 
          width: 100% !important; 
          height: 100% !important;
          filter: saturate(1.2) contrast(1.05) brightness(0.95);
        }
        .verden-watermark { z-index: 1; opacity: 0.8; }
        .user-marker-waze { cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Map;
