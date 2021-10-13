import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FlightCard } from "../../components";
import { addFlights, fetchFlights } from '../../redux/actions.js'


const numOfCards = 3;
let flights = [];
let flightCards = [];

const Flights = () => {
  
  const [x, setX] = useState(0);
  
  const dispatch = useDispatch();
 
  const depCityName = useSelector(state => state.departureCity);
  const depCountryCode = useSelector(state => state.departureCountryCode);
  const destCityName = useSelector(state => state.destinationCity);
  const destCountryCode = useSelector(state => state.destinationCountryCode);


  async function fetchFlightData() {
    flights = await fetchFlights(depCityName, depCountryCode, destCityName, destCountryCode);
    setX(prevX => ++prevX);
    return
  }

  fetchFlightData();
  dispatch(addFlights(flights));

  useEffect(() => {

    if (x === 3) {

      for (let i = 0; i < numOfCards; i++) {
    
        let flight = flights[i];
      
        let flightInfo = {
          depCity: depCityName,
          depDateTime: flight.departure.estimated.split('T').join('  '),
          depAirport: flight.departure.airport,
          airline: flight.airline.name,
          destCity: destCityName,
          destDateTime: flight.arrival.estimated.split('T').join('  '),
          destAirport: flight.arrival.airport
        }
        flightCards.push(<FlightCard flight={flightInfo} key={i} />)
      }
      setX(prevX => ++prevX);
    }

  }, [x])
  

  return x > 2
    ? <div>{flightCards}</div>
    : <div>bionerwu</div>
  
};

export default Flights;
