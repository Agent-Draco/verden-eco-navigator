import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/theme-provider';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-rotatedmarker';

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
  const mapInstance = useRef<L.Map | null>(null);
  const userMarker = useRef<any>(null);
  const destinationMarker = useRef<L.Marker | null>(null);
  const routeLayers = useRef<L.Layer[]>([]);
  const tileLayerRef = useRef<L.TileLayer | null>(null);

  // ── Initialize map ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 15,
        zoomControl: false,
      });

      const initialTileUrl =
        currentTheme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

      tileLayerRef.current = L.tileLayer(initialTileUrl, {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstance.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Theme: swap tile layer ─────────────────────────────────────────────────
  useEffect(() => {
    if (tileLayerRef.current) {
      const tileUrl =
        currentTheme === 'dark'
          ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
          : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
      tileLayerRef.current.setUrl(tileUrl);
    }
  }, [currentTheme]);

  // ── MAP ROTATION via CSS ───────────────────────────────────────────────────
  // Rotate the map container opposite to bearing so forward is always "up".
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.style.transform = `rotate(${-bearing}deg)`;
      // Force Leaflet to recalculate element sizes after transform
      mapInstance.current?.invalidateSize();
    }
  }, [bearing]);

  // ── User location + vehicle marker ────────────────────────────────────────
  useEffect(() => {
    if (!userLocation || !mapInstance.current) return;

    const wazeCarHtml = `
      <div style="width: 48px; height: 48px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="4" flood-opacity="0.4"/>
            </filter>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>
          </defs>
          <g filter="url(#shadow)">
            <rect x="25" y="15" width="10" height="20" rx="4" fill="#1f2937"/>
            <rect x="65" y="15" width="10" height="20" rx="4" fill="#1f2937"/>
            <rect x="25" y="65" width="10" height="20" rx="4" fill="#1f2937"/>
            <rect x="65" y="65" width="10" height="20" rx="4" fill="#1f2937"/>
            <rect x="30" y="10" width="40" height="80" rx="16" fill="url(#bodyGrad)" stroke="#93c5fd" stroke-width="2"/>
            <path d="M 34 35 Q 50 28 66 35 L 61 50 L 39 50 Z" fill="#0f172a" opacity="0.8"/>
            <path d="M 34 70 Q 50 78 66 70 L 61 55 L 39 55 Z" fill="#0f172a" opacity="0.8"/>
            <circle cx="38" cy="16" r="4.5" fill="#fef08a"/>
            <circle cx="62" cy="16" r="4.5" fill="#fef08a"/>
            <rect x="35" y="85" width="8" height="4" rx="2" fill="#ef4444"/>
            <rect x="57" y="85" width="8" height="4" rx="2" fill="#ef4444"/>
          </g>
        </svg>
      </div>
    `;

    const carIcon = L.divIcon({
      html: wazeCarHtml,
      className: 'waze-car-icon bg-transparent border-0',
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    if (!userMarker.current) {
      userMarker.current = L.marker(userLocation, {
        icon: carIcon,
        // Keep car upright — map container rotates instead
        rotationAngle: 0,
        rotationOrigin: 'center center',
      } as any).addTo(mapInstance.current);
    } else {
      userMarker.current.setLatLng(userLocation);
    }

    // Always center on user with smooth animation
    mapInstance.current.setView(userLocation, 16, { animate: true });
  }, [userLocation]);

  // ── Destination marker ────────────────────────────────────────────────────
  useEffect(() => {
    if (destination && mapInstance.current) {
      const coords: [number, number] = [
        destination.geometry.coordinates[1],
        destination.geometry.coordinates[0],
      ];
      if (!destinationMarker.current) {
        destinationMarker.current = L.marker(coords).addTo(mapInstance.current);
      } else {
        destinationMarker.current.setLatLng(coords);
      }
    }
  }, [destination]);

  // ── Route polylines ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapInstance.current) return;
    routeLayers.current.forEach((layer) => mapInstance.current!.removeLayer(layer));
    routeLayers.current = [];

    const drawRoute = (route: any, color: string, weight: number, opacity: number) => {
      const polyline = L.geoJSON(route.geometry, {
        style: { color, weight, opacity },
      }).addTo(mapInstance.current!);
      routeLayers.current.push(polyline);
    };

    if (fastestRoute && greenestRoute && fastestRoute.id === greenestRoute.id) {
      drawRoute(greenestRoute, '#10b981', 7, 0.9);
    } else {
      if (fastestRoute) drawRoute(fastestRoute, '#3b82f6', 6, 0.8);
      if (greenestRoute) drawRoute(greenestRoute, '#10b981', 6, 0.9);
    }

    if ((fastestRoute || greenestRoute) && userLocation && destination) {
      const bounds = L.latLngBounds(userLocation, [
        destination.geometry.coordinates[1],
        destination.geometry.coordinates[0],
      ]);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [fastestRoute, greenestRoute, userLocation, destination]);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ transformOrigin: 'center center' }}
    >
      <div
        ref={mapRef}
        className="absolute inset-0"
        style={{
          transition: 'transform 0.3s ease',
          // Slightly over-size so edges don't show when rotated
          width: '140%',
          height: '140%',
          top: '-20%',
          left: '-20%',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default Map;
