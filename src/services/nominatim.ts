import { createClient } from '@supabase/supabase-js';

// Dedicated Supabase client for search location database (NAVLOCDB)
const navlocUrl = import.meta.env.VITE_NAVLOCDB_SUPABASE_URL || 'https://tperblyaeuzytcuhveob.supabase.co';
const navlocAnonKey = import.meta.env.VITE_NAVLOCDB_SUPABASE_ANON_KEY || 'placeholder';

export const navlocSupabase = createClient(navlocUrl, navlocAnonKey);

const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    name?: string;
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
    [key: string]: string | undefined;
  };
  boundingbox: string[];
}

/**
 * Normalizes Nominatim result into a format compatible with existing app components
 */
const normalizeResult = (res: any) => {
  const city = res.address?.city || res.address?.town || res.address?.village || res.address?.suburb || '';
  const state = res.address?.state || '';
  const country = res.address?.country || '';
  
  // Create a GeoJSON-like structure to maintain compatibility with Map.tsx and Home.tsx
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [parseFloat(res.lon), parseFloat(res.lat)]
    },
    properties: {
      name: res.name || res.display_name.split(',')[0],
      display_name: res.display_name,
      city,
      state,
      country,
      type: res.type,
      importance: res.importance,
      address: res.address
    }
  };
};

export const searchPlaces = async (query: string, userLocation?: [number, number]) => {
  if (!query || query.length < 3) return [];

  // 1. Check NAVLOCDB Supabase Cache first
  try {
    const { data: cachedResults, error: cacheError } = await navlocSupabase
      .from('places_cache')
      .select('*')
      .ilike('search_query', query)
      .limit(20);

    if (!cacheError && cachedResults && cachedResults.length > 0) {
      console.log('Using cached results for:', query);
      const normalizedCached = cachedResults.map(item => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.lon, item.lat]
        },
        properties: {
          name: item.name,
          display_name: item.display_name,
          city: item.city,
          state: item.state,
          country: item.country,
          type: item.type,
          importance: item.importance
        }
      }));
      // Deduplicate cache results
      return Array.from(new Map(normalizedCached.map(item => [item.properties.display_name, item])).values());
    }
  } catch (err) {
    console.error('Cache check failed:', err);
  }

  // 2. Fetch from Nominatim API
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '20',
    countrycodes: 'in', // Priority for India
    'accept-language': 'en',
  });

  if (userLocation) {
    const [lat, lng] = userLocation;
    // Nominatim uses lat/lon for proximity biasing
    params.append('lat', lat.toString());
    params.append('lon', lng.toString());
    
    // Also provide a viewbox but DON'T bound it strictly
    const viewbox = `${lng - 0.5},${lat + 0.5},${lng + 0.5},${lat - 0.5}`;
    params.append('viewbox', viewbox);
  }

  try {
    const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Verden-Eco-Navigator/1.0'
      }
    });

    if (!response.ok) throw new Error('Nominatim request failed');

    const data: SearchResult[] = await response.json();
    
    // Sort by importance and then by distance if location is available
    let processedData = data;
    if (userLocation) {
        const [uLat, uLon] = userLocation;
        processedData = data.sort((a, b) => {
            const distA = Math.pow(parseFloat(a.lat) - uLat, 2) + Math.pow(parseFloat(a.lon) - uLon, 2);
            const distB = Math.pow(parseFloat(b.lat) - uLat, 2) + Math.pow(parseFloat(b.lon) - uLon, 2);
            // Combine importance (0-1) and distance (inverted)
            return (distA - distB) * 0.7 + (b.importance - a.importance) * 0.3;
        });
    }

    const normalized = processedData.map(normalizeResult);
    
    // Deduplicate by display_name to ensure UI list is clean
    const uniqueNormalized = Array.from(new Map(normalized.map(item => [item.properties.display_name, item])).values());

    // 3. Store in NAVLOCDB Supabase Cache (Background)
    if (normalized.length > 0) {
      const cacheRows = processedData.map(res => ({
        name: res.name || res.display_name.split(',')[0],
        display_name: res.display_name,
        lat: parseFloat(res.lat),
        lon: parseFloat(res.lon),
        type: res.type,
        city: res.address?.city || res.address?.town || res.address?.village || '',
        state: res.address?.state || '',
        country: res.address?.country || '',
        importance: res.importance,
        search_query: query.toLowerCase()
      }));

      // Use upsert to prevent duplicates if the table has a unique constraint on some columns
      // If not, we'll just try to insert and ignore conflicts if possible
      navlocSupabase.from('places_cache').upsert(cacheRows, {
        onConflict: 'display_name,search_query',
        ignoreDuplicates: true
      }).then(({ error }) => {
        if (error) console.warn('Cache update noticed (likely duplicate):', error.message);
      });
    }

    return uniqueNormalized;
  } catch (error) {
    console.error('Nominatim search failed:', error);
    return [];
  }
};
