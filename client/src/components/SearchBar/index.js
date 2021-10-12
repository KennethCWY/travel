import React, { useState } from 'react';
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
        const tripId = nanoid(7);
        dispatch(updateTripDetails({tripId, departureDate, returnDate}));
        history.push('/flights');
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

        // history.push('/flights');
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
