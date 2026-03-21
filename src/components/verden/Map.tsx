import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; //stops map from intializing more than once
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [lng, lat],
      zoom: zoom,
    });

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position.coords;
        setLng(longitude);
        setLat(latitude);
        map.current.setCenter([longitude, latitude]);
        new maplibregl.Marker().setLngLat([longitude, latitude]).addTo(map.current);
      });
    }
  }, [lng, lat, zoom]);

  return (
    <div className="map-container">
      <div ref={mapContainer} className="map" />
    </div>
  );
};

export default Map;
