import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import { FlightCard } from "../../components";
import { addFlight, randomiseArray } from '../../redux/actions.js'


const Flights = () => {
  
  const [x, setX] = useState(null);
  
  const numOfCards = 3;
  let flights = [];
  let flightCards = [];
  console.log('thwehwef', flightCards);
  const dispatch = useDispatch();
  const cityName = useSelector(state => state.destinationCity);
  const countryCode = useSelector(state => state.destinationCountryCode);
  console.log(cityName);
  console.log(countryCode);

  // const REACT_APP_AVIATIONSTACK_API_KEY = process.env.REACT_APP_AVIATIONSTACK_API_KEY;
  // console.log(REACT_APP_AVIATIONSTACK_API_KEY);

  
      async function fetchData() {

          const cityData = await axios.get('https://api.npoint.io/5f5a6588530da581be26');
          const cityArr = cityData.data.filter(city => city.name === cityName && city.country_code === countryCode);
          const cityCode = cityArr[0].code;

          const airportData = await axios.get('https://api.npoint.io/cf06c4767429ca337264');
          const airports =  airportData.data.filter(airport => airport.city_code === cityCode && airport.iata_type === 'airport' && airport.flightable === true);
          const airportCodes = airports.map(airport => airport.code);

          for (let aCode of airportCodes) {
              
              const params = {
                  access_key: '8d3a4746bce14c7460d5bcbe07f678f9',
                  arr_iata: aCode
              }
              
              try {
                  const flightsData = await axios.get('http://api.aviationstack.com/v1/flights', {params});
                  const scheduledFlights = flightsData.data.data.filter(flight => flight.flight_status === 'scheduled');
                  flights.push(...scheduledFlights);
              } catch (err) {
                  console.error(err);
              }
          }

          for (let i = 0; i < numOfCards; i++) {
            
            let flight = flights[i];
            console.log(flight);

            let flightInfo = {
              depCity: 'assume user also inputs this, so get from redux store',
              depDateTime: "flight.departure.estimated.split('T').join('  ')",
              depAirport: 'flight.departure.airport',
              airline: 'flight.airline.name',
              destCity: cityName,
              destDateTime: "flight.arrival.estimated.split('T').join('  ')",
              destAirport: 'flight.arrival.airport'
            }
            flightCards.push(<FlightCard flight={flightInfo} key={i} />)
          }
          dispatch(addFlight(randomiseArray(flights)));
          console.log('qwerqwr', flightCards);
          setX(true);
          return
      }
      
      
      useEffect(() => {
        fetchData();
      },[])

 
  
  
  
  return x
    ? <div>{flightCards}</div>
    : <div>bionerwu</div>
  
};

export default Flights;
