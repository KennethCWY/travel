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

const initialState = {
    tripId: '',
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
        case UPDATE_TRIP_DETAILS:
            return {
                ...state,
                tripId: payload.tripId,
                departure: payload.departure,
                destination: payload.destination,
                departureDate: payload.departureDate,
                returnDate: payload.returnDate
            };
        case ADD_FLIGHT:
            return { ...state, flights: [...state.flights, payload] };
        case ADD_HOTEL:
            return { ...state, hotels: [...state.hotels, payload] };
        case ADD_RESTAURANT:
            return { ...state, restaurants: [...state.restaurants, payload] };
        case ADD_ATTRACTION:
            return { ...state, attractions: [...state.attractions, payload] };
        case UPDATE_BOUNDS:
            return { ...state, bounds: payload };
        case UPDATE_COORDINATES:
            return { ...state, coordinates: payload };
        case UPDATE_DEPARTURE_DETAILS:
            return {
                ...state,
                departureCity: payload.city,
                departureCountry: payload.country,
                departureCountryCode: payload.countryCode
            };
        case UPDATE_DESTINATION_DETAILS:
            return {
                ...state,
                destinationCity: payload.city,
                destinationCountry: payload.country,
                destinationCountryCode: payload.countryCode
            };
        default:
            return state;
    }
};

export default tripReducer;
