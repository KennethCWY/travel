import React from "react"
import { useEffect } from "react";
import axios from 'axios'

import "./style.css";

function FlightCard() {

    useEffect(() => {
        async function fetchData() {

            const cityData = await axios.get('https://api.npoint.io/5f5a6588530da581be26');
            const lons = cityData.data.filter(city => city.name === 'London' && city.country_code === 'GB');
            const lonCode = lons[0].code;

            const data = await axios.get('https://api.npoint.io/cf06c4767429ca337264');
            const lonAirports =  data.data.filter(airport => airport.city_code === lonCode && airport.iata_type === 'airport' && airport.flightable === true);
            const lonAirportCodes = lonAirports.map(airport => airport.code);
            console.log(lonAirports);
            console.log(lonAirportCodes);

            for (let aCode of lonAirportCodes) {
                
                // await new Promise(resolve => setTimeout(resolve, 5000));

                const params = {
                    access_key: '5f8bb73bf843d5c5441e420597322ae3',
                    dep_iata: aCode
                }
                
                try {
                    const response = await axios.get('http://api.aviationstack.com/v1/flights', {params});
                    const result = response.data.data;
                    console.log(result[0]);
                } catch (err) {
                    console.error(err);
                }
            }
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
