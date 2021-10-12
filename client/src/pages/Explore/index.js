import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Autocomplete } from '@react-google-maps/api';
import { ExploreImages } from '../../components';
import {
    updateBounds,
    updateCity,
    updateCoordinates,
    updateCountry,
    updateCountryCode,
    updateDestination
} from '../../redux/actions';
import './style.css';

const Explore = () => {
    const [autocomplete, setAutocomplete] = useState(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        const destination = event.target.destination.value;
        dispatch(updateDestination(destination));
        history.push('/flights');
    };

    const formatLocationAddress = place => {
        const addressComponents = place.address_components;
        const formattedAddress = place.formatted_address;
        const city = addressComponents[1].long_name;
        const country = addressComponents.at(-1).long_name;
        const countryCode = addressComponents.at(-1).short_name;
        
        dispatch(updateDestination(formattedAddress));
        dispatch(updateCity(city));
        dispatch(updateCountry(country));
        dispatch(updateCountryCode(countryCode));

        history.push('/flights');
    };

    const handlePlaceChanged = () => {
        formatLocationAddress(autocomplete.getPlace());

        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        const bounds = {
            ne: {
                lat: autocomplete.getPlace().geometry.viewport.tc.i,
                lng: autocomplete.getPlace().geometry.viewport.Hb.i
            },
            sw: {
                lat: autocomplete.getPlace().geometry.viewport.tc.g,
                lng: autocomplete.getPlace().geometry.viewport.Hb.g
            }
        };

        dispatch(updateCoordinates({ lat, lng }));
        dispatch(updateBounds(bounds));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Autocomplete
                    onPlaceChanged={handlePlaceChanged}
                    onLoad={term => setAutocomplete(term)}
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
            </form>
            <h2>Discover upcoming flights</h2>
            <ExploreImages />
        </div>
    );
};

export default Explore;
