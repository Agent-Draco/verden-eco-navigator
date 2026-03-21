import { useState, useEffect } from "react";
import { getRoute } from "@/services/osrm";
import * as turf from "@turf/turf";

// --- Mock Data ---
const mockUsers = [
  { id: 1, name: "Sarah K.", avatar: "SK", departureTime: new Date(Date.now() + 5 * 60000) },
  { id: 2, name: "Alex M.", avatar: "AM", departureTime: new Date(Date.now() + 12 * 60000) },
  { id: 3, name: "Priya D.", avatar: "PD", departureTime: new Date(Date.now() + 8 * 60000) },
  { id: 4, name: "Jordan L.", avatar: "JL", departureTime: new Date(Date.now() + 20 * 60000) },
  { id: 5, name: "Chris G.", avatar: "CG", departureTime: new Date(Date.now() + 2 * 60000) },
];

const generateUserRoutes = async (userRoute) => {
  if (!userRoute) return [];
  const userStartCoords = userRoute.geometry.coordinates[0];
  const userEndCoords = userRoute.geometry.coordinates[userRoute.geometry.coordinates.length - 1];

  const generatedRoutes = await Promise.all(mockUsers.map(async (user) => {
    const startOffset = (Math.random() - 0.5) * 0.02;
    const endOffset = (Math.random() - 0.5) * 0.02;
    const startPoint = [userStartCoords[0] + startOffset, userStartCoords[1] + startOffset];
    const endPoint = [userEndCoords[0] + endOffset, userEndCoords[1] + endOffset];

    try {
      const routes = await getRoute(startPoint, endPoint);
      if (routes && routes.length > 0) {
        return { ...user, route: routes[0] };
      }
    } catch (error) {
      console.error("Error generating mock route:", error);
    }
    return null;
  }));

  return generatedRoutes.filter(Boolean);
};


// --- Matching Logic ---
const calculateRouteOverlap = (routeA, routeB) => {
  const lineA = turf.lineString(routeA.geometry.coordinates);
  const lineB = turf.lineString(routeB.geometry.coordinates);
  const lengthA = turf.length(lineA, { units: 'kilometers' });
  
  if (lengthA === 0) return 0;

  const intersection = turf.lineIntersect(lineA, lineB);
  if (intersection.features.length === 0) return 0;

  // A more robust way to calculate overlap is to find the longest shared segment,
  // but for this simulation, we'll simplify by checking intersection and proximity.
  // A simple heuristic: if they intersect, we estimate overlap based on start/end proximity.
  const startDist = turf.distance(turf.point(routeA.geometry.coordinates[0]), turf.point(routeB.geometry.coordinates[0]));
  const endDist = turf.distance(turf.point(routeA.geometry.coordinates.slice(-1)[0]), turf.point(routeB.geometry.coordinates.slice(-1)[0]));
  
  const totalDist = startDist + endDist;
  const overlap = Math.max(0, 1 - totalDist / (lengthA * 0.5)); // Heuristic adjustment
  
  return overlap;
};

const calculateTimeCompatibility = (timeA, timeB) => {
  const timeDiffMinutes = Math.abs(timeA.getTime() - timeB.getTime()) / (1000 * 60);
  if (timeDiffMinutes > 15) return 0;
  return 1 - (timeDiffMinutes / 15);
};


// --- Main Hook ---
const useEcoMoov = (userRoute, userDepartureTime) => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const findMatches = async () => {
      if (!userRoute) return;

      const potentialMatches = await generateUserRoutes(userRoute);
      
      const scoredMatches = potentialMatches.map(matchUser => {
        if (!matchUser.route) return null;

        const routeOverlap = calculateRouteOverlap(userRoute, matchUser.route);
        const timeMatch = calculateTimeCompatibility(userDepartureTime, matchUser.departureTime);

        const matchScore = (routeOverlap * 0.7) + (timeMatch * 0.3);

        if (matchScore < 0.4) return null; // Filter out low scores

        return {
          ...matchUser,
          match: Math.round(matchScore * 100),
          members: Math.floor(Math.random() * 3) + 1, // 1-3 members already in the group
        };
      });

      setGroups(scoredMatches.filter(Boolean).sort((a, b) => b.match - a.match));
    };

    findMatches();
  }, [userRoute, userDepartureTime]);

  return groups;
};

export default useEcoMoov;
