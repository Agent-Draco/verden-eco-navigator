const PHOTON_API_URL = "https://photon.komoot.io/api/";

export const searchPlaces = async (query: string) => {
  const response = await fetch(`${PHOTON_API_URL}?q=${query}`);
  const data = await response.json();
  return data.features;
};
