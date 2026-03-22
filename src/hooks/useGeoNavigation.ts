/**
 * useGeoNavigation — Consumer-grade GPS + compass hook
 *
 * Automatically:
 *  - Tracks user location continuously (high-accuracy watchPosition)
 *  - Uses DeviceOrientationEvent (compass) for heading when available
 *  - Falls back to computed bearing between GPS fixes
 *  - Computes speed from GPS coords.speed or distance/time
 *  - Smooths speed with a rolling average
 *  - Requests iOS 13+ DeviceOrientation permission automatically
 *  - Exposes ready-to-use location, bearing, speedKmh, and error state
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { haversineDistance, calcBearing, SpeedSmoother } from '@/lib/navUtils';

export interface GeoNavState {
  /** Current [lat, lng] or null until first fix */
  location: [number, number] | null;
  /** Compass/movement bearing in degrees (0–360) */
  bearing: number;
  /** Smoothed speed in km/h */
  speedKmh: number;
  /** Human-readable error string, null when GPS is working */
  error: string | null;
  /** True once we have the first fix */
  ready: boolean;
}

const SPEED_SMOOTHER = new SpeedSmoother(4);

export function useGeoNavigation(): GeoNavState {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [bearing, setBearing] = useState(0);
  const [speedKmh, setSpeedKmh] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Refs — mutate without triggering re-render
  const prevPosRef = useRef<{ lat: number; lon: number; ts: number } | null>(null);
  const bearingRef = useRef(0); // latest computed bearing (for GPS-fallback)
  const compassActiveRef = useRef(false); // true if DeviceOrientation is working

  // ── GPS watch ──────────────────────────────────────────────────────────────
  const handlePosition = useCallback((pos: GeolocationPosition) => {
    setError(null);

    const { latitude, longitude } = pos.coords;
    const now = Date.now();
    const newLoc: [number, number] = [latitude, longitude];
    setLocation(newLoc);
    setReady(true);

    if (prevPosRef.current) {
      const { lat: pLat, lon: pLon, ts: pTs } = prevPosRef.current;
      const distM = haversineDistance(pLat, pLon, latitude, longitude);
      const elapsedS = (now - pTs) / 1000;

      // ── Bearing (use DeviceOrientation if active, else compute from GPS) ──
      if (!compassActiveRef.current && distM > 3) {
        const computed = calcBearing(pLat, pLon, latitude, longitude);
        bearingRef.current = computed;
        setBearing(computed);
      }

      // ── Speed ──────────────────────────────────────────────────────────────
      let rawKmh: number;
      if (pos.coords.speed !== null && pos.coords.speed >= 0) {
        // GPS chip provides speed (most phones do this)
        rawKmh = pos.coords.speed * 3.6;
      } else if (elapsedS > 0 && distM > 0) {
        // Compute from delta-position
        rawKmh = (distM / elapsedS) * 3.6;
      } else {
        rawKmh = 0;
      }
      const smoothed = SPEED_SMOOTHER.add(rawKmh);
      setSpeedKmh(Math.round(smoothed));
    }

    prevPosRef.current = { lat: latitude, lon: longitude, ts: now };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      handlePosition,
      (err) => {
        console.error('GPS error:', err);
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Location access denied. Please allow location in browser settings.'
            : err.code === err.POSITION_UNAVAILABLE
            ? 'Location unavailable. Move to an open area or check GPS signal.'
            : 'GPS timeout — retrying…'
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [handlePosition]);

  // ── DeviceOrientation (compass) ────────────────────────────────────────────
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // `alpha` = compass heading (0° = North). We negate for map bearing.
      if (e.alpha !== null) {
        // webkitCompassHeading on iOS gives true-north heading directly
        const compassHeading =
          (e as any).webkitCompassHeading ?? (360 - e.alpha);
        bearingRef.current = compassHeading;
        compassActiveRef.current = true;
        setBearing(compassHeading);
      }
    };

    const attachOrientation = () => {
      window.addEventListener('deviceorientation', handleOrientation, true);
    };

    // iOS 13+ requires explicit permission
    if (
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      (DeviceOrientationEvent as any)
        .requestPermission()
        .then((result: string) => {
          if (result === 'granted') attachOrientation();
        })
        .catch(() => {
          // Permission denied — fall back to GPS bearing
        });
    } else {
      // Android / desktop — attach directly
      attachOrientation();
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, []);

  return { location, bearing, speedKmh, error, ready };
}
