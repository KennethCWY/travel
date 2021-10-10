import React from "react"
import { useEffect } from "react";
import axios from 'axios'

import "./style.css";

function FlightCard() {
    
    
    async function fetchCityIATA(city) {

        let params, response, result, filteredResult;

        for (let i = 0; i < 94; i++) {
            try {
                params = {
                    access_key: '7a9f40a1e4bf0a4d559229c86894f838',
                    offset: 100*i
                }

                response = await axios.get('http://api.aviationstack.com/v1/cities', {params});
                result = response.data.data;
                filteredResult = await result.filter(place => place.city_name === city);
            } catch (err) {
                console.warn(err);
            }
            if (filteredResult.length) { break; }
        }
        console.log(filteredResult[0]);
        return filteredResult[0].iata_code;
    }

    useEffect(() => {
        async function fetchData() {
            const city_iata = await fetchCityIATA('London');
            const params = {
                access_key: '7a9f40a1e4bf0a4d559229c86894f838',
                dep_iata: city_iata
            }

            const response = await axios.get('http://api.aviationstack.com/v1/flights', {params});
            const result = response.data.data;
            console.log(result);
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
