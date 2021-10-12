import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios'

import { FlightCard } from "../../components";
import { addFlight, randomiseArray } from '../../redux/actions.js'


const Flights = () => {

  let flights = [];
  const dispatch = useDispatch();
  const cityName = useSelector(state => state.city);
  const countryCode = useSelector(state => state.countryCode);

  // const REACT_APP_AVIATIONSTACK_API_KEY = process.env.REACT_APP_AVIATIONSTACK_API_KEY;
  // console.log(REACT_APP_AVIATIONSTACK_API_KEY);

  useEffect(() => {
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
          console.log(flights);
      }
      fetchData();
  }, []);

  const numOfCards = 3;
  let flightCards = [];

  for (let i = 0; i < numOfCards; i++) {
    
    let flight = flights[i];

    let flightInfo = {
      depCity: cityName,
      depDateTime: "flight.departure.estimated.split('T').join('  ')",
      depAirport: 'flight.departure.airport',
      airline: 'flight.airline.name',
      destCity: 'assume user also inputs this, so get from redux store',
      destDateTime: "flight.arrival.estimated.split('T').join('  ')",
      destAirport: 'flight.arrival.airport'
    }
    flightCards.push(<FlightCard flight={flightInfo} key={i} />)
  }

  return <div>{flightCards}</div>
};

export default Flights;
