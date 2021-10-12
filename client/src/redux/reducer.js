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

const initialState = {
    tripId: '',
    tripCardId: '',
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    flights: [],
    hotels: [],
    restaurants: [],
    attractions: [],

    // Related to Flights
    departureCity: '',
    departureCountry: '',
    departureCountryCode: '',

    destinationCity: '',
    destinationCountry: '',
    destinationCountryCode: '',

    // Related to Places API
    bounds: {},
    coordinates: {}
};

const tripReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case UPDATE_DESTINATION:
            return { ...state, destination: payload };
        case UPDATE_DEPARTURE:
            return { ...state, departure: payload };
        case UPDATE_TRIP_DETAILS:
            return {
                ...state,
                tripCardId: payload.tripCardId,
                tripId: payload.tripId,
                departureDate: payload.departureDate,
                returnDate: payload.returnDate
            };
        case ADD_FLIGHTS:
            return { ...state, flights: payload };
        case ADD_HOTELS:
            return { ...state, hotels: payload };
        case ADD_RESTAURANTS:
            return { ...state, restaurants: payload };
        case ADD_ATTRACTIONS:
            return { ...state, attractions: payload };
        case UPDATE_BOUNDS:
            return { ...state, bounds: payload };
        case UPDATE_COORDINATES:
            return { ...state, coordinates: payload };
        case UPDATE_DEPARTURE_DETAILS:
            return {
                ...state, 
                departure: `${payload.city}, ${payload.country}`,
                departureCity: payload.city,
                departureCountry: payload.country,
                departureCountryCode: payload.countryCode
            };
        case UPDATE_DESTINATION_DETAILS:
            return {
                ...state,
                destination: `${payload.city}, ${payload.country}`,
                destinationCity: payload.city,
                destinationCountry: payload.country,
                destinationCountryCode: payload.countryCode
            };
        default:
            return state;
    }
};

export default tripReducer;
