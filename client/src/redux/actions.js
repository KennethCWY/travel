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
    const { tripId, departureDate, returnDate } = trip;

    return {
        type: UPDATE_TRIP_DETAILS,
        payload: { tripId, departureDate, returnDate }
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

export function randomiseArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor((i + 1) * Math.random());
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}
