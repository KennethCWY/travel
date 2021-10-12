import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Autocomplete } from '@react-google-maps/api';
import { nanoid } from 'nanoid';
import './style.css';
import { useHistory } from 'react-router';
import {
    updateDepartureDetails,
    updateDestinationDetails,
    updateDestination,
    updateDeparture,
    updateBounds,
    updateCoordinates,
    updateTripDetails
} from '../../redux/actions';

function SearchBar() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [autocompleteDeparture, setAutocompleteDeparture] = useState(null);
    const [autocompleteDestination, setAutocompleteDestination] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const departureDate = e.target.departuredate.value;
        const returnDate = e.target.arrivaldate.value;
        const destination = e.target.destination.value
        const departure = e.target.departure.value
        const tripId = nanoid(7);
        const userId = localStorage.getItem("user_id")
        const formData = {trip_id: tripId, departure_date: departureDate, return_date: returnDate, destination: destination, departure: departure, user: userId}
        const token = localStorage.getItem("access_token")
        console.log(formData)
        console.log(token)
        console.log(departureDate, returnDate)

        const { data } = await axios.post('http://localhost:8000/api/trips/', formData, {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            },
        })

        console.log(data)
        dispatch(updateTripDetails({tripId, departureDate, returnDate}));

        
    }

    const formatDestinationAddress = async place => {
        const addressComponents = place.address_components;
        const formattedAddress = place.formatted_address;

        const countryComponent = await addressComponents.find(component =>
            component.types.includes('country')
        );

        const cityComponent = await addressComponents.find(component =>
            component.types.includes('locality')
        );

        const country = countryComponent.long_name;
        const countryCode = countryComponent.short_name;
        const city = cityComponent.long_name;

        dispatch(updateDestination(formattedAddress));
        dispatch(updateDestinationDetails(city, country, countryCode));

    };

    const handleDestinationChanged = () => {
        formatDestinationAddress(autocompleteDestination.getPlace());

        const lat = autocompleteDestination.getPlace().geometry.location.lat();
        const lng = autocompleteDestination.getPlace().geometry.location.lng();

        const bounds = {
            ne: {
                lat: autocompleteDestination.getPlace().geometry.viewport.tc.i,
                lng: autocompleteDestination.getPlace().geometry.viewport.Hb.i
            },
            sw: {
                lat: autocompleteDestination.getPlace().geometry.viewport.tc.g,
                lng: autocompleteDestination.getPlace().geometry.viewport.Hb.g
            }
        };

        dispatch(updateCoordinates({ lat, lng }));
        dispatch(updateBounds(bounds));
    };

    const handleDepartureChanged = async () => {
        const addressComponents = autocompleteDeparture.getPlace().address_components;
        const formattedAddress = autocompleteDeparture.getPlace().formatted_address;

        const countryComponent = await addressComponents.find(component =>
            component.types.includes('country')
        );

        const cityComponent = await addressComponents.find(component =>
            component.types.includes('locality')
        );

        const country = countryComponent.long_name;
        const countryCode = countryComponent.short_name;
        const city = cityComponent.long_name;

        dispatch(updateDeparture(formattedAddress));
        dispatch(updateDepartureDetails(city, country, countryCode));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    onPlaceChanged={handleDepartureChanged}
                    onLoad={term => setAutocompleteDeparture(term)}
                >
                    <input
                        id="departure"
                        name="departure"
                        aria-label="departure"
                        type="text"
                        placeholder="Departure"
                        required
                    />
                </Autocomplete>
                <Autocomplete
                    onPlaceChanged={handleDestinationChanged}
                    onLoad={term => setAutocompleteDestination(term)}
                >
                    <input
                        id="destination"
                        name="destination"
                        aria-label="destination"
                        type="text"
                        placeholder="Destination"
                        required
                    />
                </Autocomplete>
                <input
                    id="departuredate"
                    name="departuredate"
                    aria-label="departuredate"
                    type="date"
                    required
                />
                <input
                    id="arrivaldate"
                    name="arrivaldate"
                    aria-label="arrivaldate"
                    type="date"
                    required
                />
                <input id="submit-btn" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SearchBar;
