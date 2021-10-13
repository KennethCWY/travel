import axios from 'axios';

/**
 * Uses the travel advisor API to fetch information about places around the world using the bound's sw and ne properties.
 * @param {string} type should be `hotels`, `restaurants` or `attractions`.
 * @param {object} sw contains `lat` and `lng` properties.
 * @param {object} ne contains `lat` and `lng` properties.
 * @returns an array of place objects.
 */
export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data } = await axios.get(
            `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: sw.lat,
                    tr_latitude: ne.lat,
                    bl_longitude: sw.lng,
                    tr_longitude: ne.lng
                },
                headers: {
                    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                    'x-rapidapi-key': 'ae8aa95ba8msh7642a99b18e880cp1159d6jsn32c1d7c82775'
                }
            }
        );

        return data.data;
    } catch (error) {
        console.error({ placesError: error });
    }
};
