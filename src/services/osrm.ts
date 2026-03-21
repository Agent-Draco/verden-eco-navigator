const OSRM_API_URL = "https://router.project-osrm.org/route/v1/driving/";

export const getRoute = async (start: [number, number], end: [number, number]) => {
  const response = await fetch(`${OSRM_API_URL}${start.join(',')};${end.join(',')}?alternatives=true&overview=full&geometries=geojson`);
  const data = await response.json();
  return data.routes;
};
