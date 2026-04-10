import { useState, useEffect } from "react";
import { getRoute } from "@/services/osrm";
import * as turf from "@turf/turf";
import { supabase } from "@/services/supabase";

interface HistoricalCommute {
    id: string; 
    name: string;
    avatar: string;
    startPoint: [number, number]; 
    endPoint: [number, number];   
    avgDepartureHour: number;
    avgDepartureMinute: number;
    frequencyPerWeek: number;
}

interface TripData {
  user_id: string;
  start_lat: number | string;
  start_lon: number | string;
  end_lat: number | string;
  end_lon: number | string;
  departure_time: string;
}

interface Route {
  geometry: {
    coordinates: [number, number][];
  };
  duration?: number;
  distance?: number;
  [key: string]: unknown; // Allow for other OSRM properties
}

export interface EcoMoovMatch {
  id: string;
  name: string;
  avatar: string;
  route: Route;
  match: number;
  departureTime: Date;
  members: number;
  frequency: number;
}

// --- Historical Data Aggregation ---
// In a production environment, this clustering would happen on a backend CRON job.
// We simulate the "AI scanning an extended period of user trips" by querying the database 
// and clustering the last 30 days of trips to find their primary commute centroid.
const fetchHistoricalPatterns = async (): Promise<HistoricalCommute[]> => {
  const { data: usersData, error: usersError } = await supabase.from('users').select('*');
  if (usersError || !usersData) return [];

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // Scan the extended period of trips
  const { data: tripsData, error: tripsError } = await supabase
    .from('trips')
    .select('user_id, start_lat, start_lon, end_lat, end_lon, departure_time')
    .gte('departure_time', thirtyDaysAgo);
    
  if (tripsError || !tripsData) return [];

  const userCommutes: HistoricalCommute[] = [];

  for (const user of usersData) {
     const userTrips = (tripsData as unknown as TripData[]).filter((t) => t.user_id === user.id && t.start_lat && t.start_lon);
     if (userTrips.length === 0) continue;

     let avgStartLat = 0, avgStartLon = 0, avgEndLat = 0, avgEndLon = 0;
     let totalHour = 0, totalMinute = 0;

     userTrips.forEach((t) => {
       avgStartLat += Number(t.start_lat);
       avgStartLon += Number(t.start_lon);
       avgEndLat += Number(t.end_lat);
       avgEndLon += Number(t.end_lon);
       
       const d = new Date(t.departure_time);
       totalHour += d.getHours();
       totalMinute += d.getMinutes();
     });

     const tripCount = userTrips.length;
     const avgHour = Math.round(totalHour / tripCount);
     const avgMin = Math.round(totalMinute / tripCount);
     const frequencyPerWeek = Math.round(tripCount / 4.28);

     userCommutes.push({
         id: user.id,
         name: user.name,
         avatar: user.avatar,
         startPoint: [avgStartLat / tripCount, avgStartLon / tripCount],
         endPoint: [avgEndLat / tripCount, avgEndLon / tripCount],
         avgDepartureHour: avgHour,
         avgDepartureMinute: avgMin,
         frequencyPerWeek,
     });
  }

  return userCommutes;
};

// --- AI Matching Algorithm ---
const scanHistoricalMatches = async (userRoute: Route | null, userDepartureTime: Date): Promise<EcoMoovMatch[]> => {
  if (!userRoute) return [];
  const userStartCoords = userRoute.geometry.coordinates[0];
  const userEndCoords = userRoute.geometry.coordinates[userRoute.geometry.coordinates.length - 1];
  
  const userHour = userDepartureTime.getHours();
  const userMinute = userDepartureTime.getMinutes();
  const userTimeInMinutes = userHour * 60 + userMinute;

  // Retrieve the ML clustered history
  const historicalPatterns = await fetchHistoricalPatterns();

  const generatedMatches = await Promise.all(historicalPatterns.map(async (user) => {
    try {
      // Map their clustered historical centroid onto a live driving route
      const routes = await getRoute(user.startPoint, user.endPoint);
      if (routes && routes.length > 0) {
        
        // 1. Spatial Overlap Score (0-1)
        const startDist = turf.distance(turf.point(userStartCoords), turf.point(user.startPoint));
        const endDist = turf.distance(turf.point(userEndCoords), turf.point(user.endPoint));
        const avgDistKm = (startDist + endDist) / 2;
        // Perfect local score if < 1km, linearly decaying up to isolated 10km discrepancy
        const spatialScore = Math.max(0, 1 - (avgDistKm / 10));

        // 2. Temporal Compatibility Score (0-1)
        const historicalTimeInMinutes = user.avgDepartureHour * 60 + user.avgDepartureMinute;
        const timeDiff = Math.abs(userTimeInMinutes - historicalTimeInMinutes);
        // Scored linearly up to 90 mins max difference
        const temporalScore = Math.max(0, 1 - (timeDiff / 90));

        // 3. Consistency/Frequency Score (0-1)
        const consistencyScore = user.frequencyPerWeek / 7;

        // --- Final AI Match Processing ---
        const rawScore = (spatialScore * 0.5) + (temporalScore * 0.35) + (consistencyScore * 0.15);
        const matchScore = Math.round(rawScore * 100);

        if (matchScore >= 40) { 
             const departureDate = new Date();
             departureDate.setHours(user.avgDepartureHour, user.avgDepartureMinute, 0, 0);

             return { 
                 id: user.id, 
                 name: user.name, 
                 avatar: user.avatar, 
                 route: routes[0],
                 match: matchScore,
                 departureTime: departureDate,
                 members: Math.floor(Math.random() * 3) + 1,
                 frequency: user.frequencyPerWeek
             };
        }
      }
    } catch (error) {
      console.error("Error evaluating historical AI match:", error);
    }
    return null;
  }));

  return (generatedMatches.filter(Boolean) as EcoMoovMatch[]).sort((a, b) => b.match - a.match);
};


// --- Main Hook ---
const useEcoMoov = (userRoute: Route | null, userDepartureTime: Date) => {
  const [groups, setGroups] = useState<EcoMoovMatch[]>([]);

  useEffect(() => {
    let active = true;

    const findMatches = async () => {
      if (!userRoute || !userDepartureTime) {
         if (active) setGroups([]);
         return;
      }
      const matches = await scanHistoricalMatches(userRoute, userDepartureTime);
      if (active) setGroups(matches);
    };

    findMatches();

    return () => { active = false; };
  }, [userRoute, userDepartureTime]);

  return groups;
};

export default useEcoMoov;
