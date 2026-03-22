/**
 * Navigation utility functions for real-time GPS tracking.
 */

const R = 6371000; // Earth radius in metres

/** Convert degrees to radians */
const toRad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Haversine distance between two lat/lng points in metres.
 */
export function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Initial bearing from point A → point B in degrees (0–360).
 */
export function calcBearing(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const dLon = toRad(lon2 - lon1);
  const lat1r = toRad(lat1);
  const lat2r = toRad(lat2);
  const x = Math.sin(dLon) * Math.cos(lat2r);
  const y =
    Math.cos(lat1r) * Math.sin(lat2r) -
    Math.sin(lat1r) * Math.cos(lat2r) * Math.cos(dLon);
  return ((Math.atan2(x, y) * 180) / Math.PI + 360) % 360;
}

/**
 * Rolling average speed smoother.
 * Keeps the last `windowSize` speed samples and returns their mean.
 */
export class SpeedSmoother {
  private samples: number[] = [];
  constructor(private windowSize = 3) {}

  add(speedKmh: number): number {
    this.samples.push(speedKmh);
    if (this.samples.length > this.windowSize) {
      this.samples.shift();
    }
    const sum = this.samples.reduce((a, b) => a + b, 0);
    return sum / this.samples.length;
  }

  get latest() {
    return this.samples.length > 0
      ? this.samples[this.samples.length - 1]
      : 0;
  }
}
