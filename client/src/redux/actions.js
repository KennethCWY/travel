import axios from 'axios';

import {
    ADD_ATTRACTIONS,
    ADD_FLIGHTS,
    ADD_HOTELS,
    ADD_RESTAURANTS,
    UPDATE_BOUNDS,
    UPDATE_COORDINATES,
    UPDATE_DEPARTURE,
    UPDATE_DEPARTURE_DETAILS,
    UPDATE_DESTINATION,
    UPDATE_DESTINATION_DETAILS,
    UPDATE_TRIP_DETAILS
} from './constants';

export const updateDestination = destination => {
    return { type: UPDATE_DESTINATION, payload: destination };
};

export const updateDeparture = departure => {
    return { type: UPDATE_DEPARTURE, payload: departure };
};

export const updateTripDetails = trip => {
    const { tripCardId, tripId, departureDate, returnDate } = trip;

    return {
        type: UPDATE_TRIP_DETAILS,
        payload: { tripCardId, tripId, departureDate, returnDate }
    };
};

export const addFlights = flights => {
    return { type: ADD_FLIGHTS, payload: flights };
};

export const addHotels = hotels => {
    return { type: ADD_HOTELS, payload: hotels };
};

export const addRestaurants = restaurants => {
    return { type: ADD_RESTAURANTS, payload: restaurants };
};

export const addAttractions = attractions => {
    return { type: ADD_ATTRACTIONS, payload: attractions };
};

export const updateBounds = bounds => {
    return { type: UPDATE_BOUNDS, payload: bounds };
};

export const updateCoordinates = coordinates => {
    return { type: UPDATE_COORDINATES, payload: coordinates };
};

export const updateDepartureDetails = (city, country, countryCode) => {
    return { type: UPDATE_DEPARTURE_DETAILS, payload: { city, country, countryCode } };
};

export const updateDestinationDetails = (city, country, countryCode) => {
    return { type: UPDATE_DESTINATION_DETAILS, payload: { city, country, countryCode } };
};

// export function randomiseArray(arr) {
//     for (let i = arr.length - 1; i > 0; i--) {
//         const j = Math.floor((i + 1) * Math.random());
//         [arr[i], arr[j]] = [arr[j], arr[i]];
//     }

//     return arr;
// }

export async function fetchFlights(depCityName, depCountryCode, destCityName, destCountryCode) {

    // const REACT_APP_AVIATIONSTACK_API_KEY = process.env.REACT_APP_AVIATIONSTACK_API_KEY;
    // console.log(REACT_APP_AVIATIONSTACK_API_KEY);

    let flights = [];

    const depCityData = await axios.get('https://api.npoint.io/5f5a6588530da581be26');
    const depCityArr = depCityData.data.filter(city => city.name === depCityName && city.country_code === depCountryCode);
    const depCityCode = depCityArr[0].code;

    const depAirportData = await axios.get('https://api.npoint.io/cf06c4767429ca337264');
    const depAirports =  depAirportData.data.filter(airport => airport.city_code === depCityCode && airport.iata_type === 'airport' && airport.flightable === true);
    const depAirportCodes = depAirports.map(airport => airport.code);

    const destCityData = await axios.get('https://api.npoint.io/5f5a6588530da581be26');
    const destCityArr = destCityData.data.filter(city => city.name === destCityName && city.country_code === destCountryCode);
    const destCityCode = destCityArr[0].code;
    
    const destAirportData = await axios.get('https://api.npoint.io/cf06c4767429ca337264');
    const destAirports =  destAirportData.data.filter(airport => airport.city_code === destCityCode && airport.iata_type === 'airport' && airport.flightable === true);
    const destAirportCodes = destAirports.map(airport => airport.code);

    for (let depAirportCode of depAirportCodes) {
        
        for (let destAirportCode of destAirportCodes) {

            const params = {
                access_key: 'c68068c8f3caf4ac252b2e3b0f877860',
                limit: 1,
                dep_iata: depAirportCode,
                arr_iata: destAirportCode
                // arr_scheduled_time_dep: date // This is not supported on the free plan apparently
            }
            
            try {
                const flightsData = await axios.get('http://api.aviationstack.com/v1/flights', {params});
                // const scheduledFlights = flightsData.data.data.filter(flight => flight.flight_status === 'scheduled');
                flights.push(...flightsData.data.data);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return flights
}
