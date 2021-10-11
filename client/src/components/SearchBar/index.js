import React, { useState } from 'react';
import './style.css';
import { useHistory } from 'react-router';

function SearchBar() {
    const [departure, setDeparture] = useState('');
    const [destination, setDestination] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const history = useHistory();

    function updateDeparture(e) {
        setDeparture(e.target.value);
    }

    function updateDestination(e) {
        setDestination(e.target.value);
    }

    function updateDepartureDate(e) {
        setDepartureDate(e.target.value);
    }

    function updateArrivalDate(e) {
        setArrivalDate(e.target.value);
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            history.push('/flights');
        } catch (err) {
            console.log(err);
        }
        setDestination('');
    }

    return (
        <form aria-label="search-bar" onSubmit={handleSubmit}>
            <input
                id="departure"
                aria-label="departure"
                type="text"
                placeholder="Departure"
                value={departure}
                onChange={updateDeparture}
                required
            />
            <input
                id="destination"
                aria-label="destination"
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={updateDestination}
                required
            />
            <input
                id="departure-date"
                aria-label="departure-date"
                type="date"
                value={departureDate}
                onChange={updateDepartureDate}
                required
            />
            <input
                id="arrival-date"
                aria-label="arrival-date"
                type="date"
                value={arrivalDate}
                onChange={updateArrivalDate}
                required
            />
            <input id="submit-btn" type="submit" value="Submit" />
        </form>
    );
}

export default SearchBar;
