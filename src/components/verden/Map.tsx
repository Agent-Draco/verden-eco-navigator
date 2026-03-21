import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-rotatedmarker';

const Map = ({ destination, fastestRoute, greenestRoute, userLocation, userHeading }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const userMarker = useRef(null);
  const destinationMarker = useRef(null);
  const routeLayers = useRef([]);

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [51.505, -0.09],
        zoom: 13,
        zoomControl: false,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(mapInstance.current);
    }
  }, []);

  useEffect(() => {
    if (userLocation && mapInstance.current) {
      const carIcon = L.icon({
        iconUrl: 'https://unpkg.com/lucide-static@latest/icons/car.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      if (!userMarker.current) {
        userMarker.current = L.marker(userLocation, {
          icon: carIcon,
          rotationAngle: userHeading,
          rotationOrigin: 'center center',
        }).addTo(mapInstance.current);
      } else {
        userMarker.current.setLatLng(userLocation);
        if (userHeading) {
          userMarker.current.setRotationAngle(userHeading);
        }
      }
      mapInstance.current.setView(userLocation, 16);
    }
  }, [userLocation, userHeading]);

  useEffect(() => {
    if (destination && mapInstance.current) {
      const coords = [destination.geometry.coordinates[1], destination.geometry.coordinates[0]];
      if (!destinationMarker.current) {
        destinationMarker.current = L.marker(coords).addTo(mapInstance.current);
      } else {
        destinationMarker.current.setLatLng(coords);
      }
    }
  }, [destination]);

  useEffect(() => {
    routeLayers.current.forEach(layer => mapInstance.current.removeLayer(layer));
    routeLayers.current = [];

    const drawRoute = (route, color, weight, opacity) => {
      const polyline = L.geoJSON(route.geometry, {
        style: {
          color,
          weight,
          opacity,
        },
      }).addTo(mapInstance.current);
      routeLayers.current.push(polyline);
    };

    if (fastestRoute && greenestRoute && fastestRoute.id === greenestRoute.id) {
        drawRoute(greenestRoute, '#10b981', 7, 0.9); // glow
    } else {
        if (fastestRoute) {
            drawRoute(fastestRoute, '#3b82f6', 6, 0.8);
        }
        if (greenestRoute) {
            drawRoute(greenestRoute, '#10b981', 6, 0.9);
        }
    }
    
    if ((fastestRoute || greenestRoute) && userLocation && destination) {
      const bounds = L.latLngBounds(userLocation, [destination.geometry.coordinates[1], destination.geometry.coordinates[0]]);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [fastestRoute, greenestRoute, userLocation, destination]);

  return <div ref={mapRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default Map;
