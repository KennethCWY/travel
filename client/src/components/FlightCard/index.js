import React from "react"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import "./style.css";
import { addFlight, randomiseArray } from '../../redux/actions.js'

function FlightCard() {
    
    let flights = [];
    const dispatch = useDispatch();
    const cityName = useSelector(store => store.city);
    const countryCode = useSelector(store => store.countryCode);

    useEffect(() => {
        async function fetchData() {
            console.log(cityName);
            console.log(countryCode);

            const cityData = await axios.get('https://api.npoint.io/5f5a6588530da581be26');
            const cityArr = cityData.data.filter(city => city.name === cityName && city.country_code === countryCode);
            const cityCode = cityArr[0].code;

            const airportData = await axios.get('https://api.npoint.io/cf06c4767429ca337264');
            const airports =  airportData.data.filter(airport => airport.city_code === cityCode && airport.iata_type === 'airport' && airport.flightable === true);
            const airportCodes = airports.map(airport => airport.code);
            console.log(airports);
            console.log(airportCodes);

            for (let aCode of airportCodes) {
                
                const params = {
                    access_key: '5f8bb73bf843d5c5441e420597322ae3',
                    dep_iata: aCode
                }
                
                try {
                    const flightsData = await axios.get('http://api.aviationstack.com/v1/flights', {params});
                    const scheduledFlights = flightsData.data.data.filter(flight => flight.flight_status === 'scheduled');
                    flights.push(...scheduledFlights);
                } catch (err) {
                    console.error(err);
                }
            }
            dispatch(addFlight(randomiseArray(flights)));
        }
        fetchData();
    }, []);


    return (
        <div className='grid-container'>
            <div>London</div>
            <div> <p id='flight-time'>6h</p> <span id='arrow'>&#10230;</span> </div>
            <div>Dubai</div>
            <div>10:40 28/10/2021</div>
            <div>British Airways</div>
            <div>14:20 15/11/20201</div>
            <div>Heathrow Airport</div>
            <div>Price: £99</div>
            <div>Dubai International Airport</div>
        </div>
    )
}

export default FlightCard
