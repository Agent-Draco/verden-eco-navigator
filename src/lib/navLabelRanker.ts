/**
 * navLabelRanker.ts
 *
 * Navigation Label Ranking System
 * ================================
 * Resolves the most contextually relevant label for turn-by-turn navigation
 * instructions using a strict priority order:
 *
 *   shop > building > area > city > highway
 *
 * This ensures instructions prefer nearby POI names (shops, buildings)
 * over generic area or road names, which gives users clearer spatial context.
 *
 * Usage:
 *   import { resolveNavLabel, formatInstruction } from '@/lib/navLabelRanker';
 */

// ── Priority table (lower number = higher priority) ──────────────────────────
export type LabelCategory = 'shop' | 'building' | 'area' | 'city' | 'highway';

export const LABEL_PRIORITY: Record<LabelCategory, number> = {
  shop: 0,
  building: 1,
  area: 2,
  city: 3,
  highway: 4,
};

// ── OSM class / type → ranked category ──────────────────────────────────────
const OSM_CLASS_TO_CATEGORY: Record<string, LabelCategory> = {
  // Shops / amenities / tourism (highest priority)
  shop: 'shop',
  amenity: 'shop',
  leisure: 'shop',
  tourism: 'shop',
  fuel: 'shop',

  // Buildings
  building: 'building',
  office: 'building',
  healthcare: 'building',
  man_made: 'building',

  // Areas / neighbourhoods / nature
  landuse: 'area',
  natural: 'area',
  boundary: 'area',
  suburb: 'area',
  neighbourhood: 'area',
  quarter: 'area',

  // Cities / places
  place: 'city',
  city: 'city',
  town: 'city',
  village: 'city',

  // Highways / roads (lowest priority)
  highway: 'highway',
  railway: 'highway',
  route: 'highway',
  road: 'highway',
};

// ── Data structures ───────────────────────────────────────────────────────────
export interface NavLabel {
  /** Human-readable name for this label */
  text: string;
  /** Resolved priority category */
  category: LabelCategory;
  /** Numeric priority (0 = highest) */
  priority: number;
}

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * Returns the LabelCategory for a given OSM class/type string.
 * Falls back to 'highway' for unrecognised keys.
 */
function osmClassToCategory(osmClass: string): LabelCategory {
  return OSM_CLASS_TO_CATEGORY[osmClass.toLowerCase()] ?? 'highway';
}

/**
 * Builds a NavLabel from a Nominatim API result object.
 * Returns null if no usable name is available.
 */
function labelFromNominatim(result: Record<string, any>): NavLabel | null {
  const name: string = (
    result.name ||
    result.display_name?.split(',')[0] ||
    ''
  ).trim();

  if (!name) return null;

  const osmClass: string = result.class || result.type || 'highway';
  const category = osmClassToCategory(osmClass);

  return { text: name, category, priority: LABEL_PRIORITY[category] };
}

/**
 * Derives a NavLabel from an OSRM step.
 * OSRM step names are road names (highway priority), but we check for
 * explicit ref strings that should still remain 'highway' class.
 * Returns null when no label can be determined.
 */
function labelFromOSRMStep(step: Record<string, any>): NavLabel | null {
  const name: string = (step?.name ?? '').trim();
  const ref: string = (step?.ref ?? '').trim();
  const dest: string = (step?.destinations ?? '').trim();

  const text = name || ref || dest;
  if (!text) return null;

  return {
    text,
    category: 'highway',
    priority: LABEL_PRIORITY['highway'],
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * resolveNavLabel
 * ---------------
 * Main resolver. Given an OSRM route step and an optional array of
 * Nominatim results for nearby POIs (sorted closest-first), returns the
 * highest-priority NavLabel available.
 *
 * Priority order: shop (0) > building (1) > area (2) > city (3) > highway (4)
 *
 * @param step        - OSRM route step object
 * @param nearbyPOIs  - Nominatim results near the maneuver location (optional)
 */
export function resolveNavLabel(
  step: Record<string, any> | null | undefined,
  nearbyPOIs: Record<string, any>[] = []
): NavLabel {
  const candidates: NavLabel[] = [];

  // 1. OSRM step label (highway priority — always lowest)
  if (step) {
    const stepLabel = labelFromOSRMStep(step);
    if (stepLabel) candidates.push(stepLabel);
  }

  // 2. Nearby Nominatim POI labels (can override with higher-priority category)
  for (const poi of nearbyPOIs) {
    const label = labelFromNominatim(poi);
    if (label) candidates.push(label);
  }

  // 3. Sort ascending by priority number (0 = best)
  candidates.sort((a, b) => a.priority - b.priority);

  // 4. Return winner, or a safe fallback
  return (
    candidates[0] ?? {
      text: 'this road',
      category: 'highway',
      priority: LABEL_PRIORITY['highway'],
    }
  );
}

/**
 * formatInstruction
 * -----------------
 * Converts an OSRM step into a human-readable turn instruction,
 * using the highest-priority label from resolveNavLabel.
 *
 * @param step       - OSRM route step
 * @param nearbyPOIs - Optional Nominatim results to boost label priority
 */
export function formatInstruction(
  step: Record<string, any> | null | undefined,
  nearbyPOIs: Record<string, any>[] = []
): string {
  if (!step) return 'Continue on route';

  const type: string = step.maneuver?.type ?? '';
  const modifier: string = step.maneuver?.modifier ?? '';

  const label = resolveNavLabel(step, nearbyPOIs);
  const onto = label.text ? `onto ${label.text}` : '';

  const MODIFIER_MAP: Record<string, string> = {
    left: 'left',
    right: 'right',
    'slight left': 'slight left',
    'slight right': 'slight right',
    'sharp left': 'sharp left',
    'sharp right': 'sharp right',
    uturn: 'U-turn',
    straight: 'straight',
  };
  const dir = MODIFIER_MAP[modifier] ?? modifier;

  if (type === 'depart') return `Head ${dir} ${onto}`.trim();
  if (type === 'arrive') return 'You have arrived';
  if (type === 'turn') return `Turn ${dir} ${onto}`.trim();
  if (type === 'continue') return `Continue ${dir} ${onto}`.trim();
  if (type === 'new name') return `Continue ${onto}`.trim();
  if (type === 'roundabout') return 'Enter the roundabout';
  if (type === 'exit roundabout') return `Exit the roundabout ${onto}`.trim();
  if (type === 'merge') return `Merge ${dir} ${onto}`.trim();
  if (type === 'fork') return `Keep ${dir} at the fork ${onto}`.trim();
  if (type === 'on ramp') return `Take the ramp ${dir} ${onto}`.trim();
  if (type === 'off ramp') return `Take the exit ${dir} ${onto}`.trim();

  return `${type} ${dir} ${onto}`.trim() || 'Continue on route';
}
