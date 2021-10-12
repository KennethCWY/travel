import {
    ADD_ATTRACTION,
    ADD_FLIGHT,
    ADD_HOTEL,
    ADD_RESTAURANT,
    UPDATE_BOUNDS,
    UPDATE_COORDINATES,
    UPDATE_DEPARTURE_DETAILS,
    UPDATE_DESTINATION,
    UPDATE_DESTINATION_DETAILS,
    UPDATE_TRIP_DETAILS
} from './constants';

export const updateDestination = destination => {
    return { type: UPDATE_DESTINATION, payload: destination };
};

export const updateTripDetails = trip => {
    const { tripId, departure, destination, departureDate, returnDate } = trip;

    return {
        type: UPDATE_TRIP_DETAILS,
        payload: { tripId, departure, destination, departureDate, returnDate }
    };
};

export const addFlight = flight => {
    return { type: ADD_FLIGHT, payload: flight };
};

export const addHotel = hotel => {
    return { type: ADD_HOTEL, payload: hotel };
};

export const addRestaurant = restaurant => {
    return { type: ADD_RESTAURANT, payload: restaurant };
};

export const addAttraction = attraction => {
    return { type: ADD_ATTRACTION, payload: attraction };
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
