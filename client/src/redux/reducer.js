import {
    ADD_ATTRACTION,
    ADD_FLIGHT,
    ADD_HOTEL,
    ADD_RESTAURANT,
    UPDATE_DESTINATION,
    UPDATE_TRIP_DETAILS,
    UPDATE_TRIP_ID
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

    // Related to Places API
    bounds: {},
    coordinates: {}
};

const tripReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case UPDATE_TRIP_ID:
            return { ...state, tripId: payload };
        case UPDATE_DESTINATION:
            return { ...state, destination: payload };
        case UPDATE_TRIP_DETAILS:
            return {
                ...state,
                departure: payload.departure,
                destination: !state.destination ? payload.destination : state.destination,
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
        default:
            return state;
    }
};

export default tripReducer;
