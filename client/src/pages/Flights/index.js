import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FlightCard } from "../../components";
import { addFlights, fetchFlights } from '../../redux/actions.js'


let flights;
let returnFlights;
let flightCards = [];
let returnFlightCards = [];

const Flights = () => {
  console.log('count reps');
  const [x, setX] = useState(0);
  const [showFlights, setShowFlights] = useState(null);
  
  const dispatch = useDispatch();
 
  const depCityName = useSelector(state => state.departureCity);
  const depCountryCode = useSelector(state => state.departureCountryCode);
  const destCityName = useSelector(state => state.destinationCity);
  const destCountryCode = useSelector(state => state.destinationCountryCode);
  // const depDate = useSelector(state => state.departureDate);
  // const returnDate = useSelector(state => state.returnDate);

  async function fetchFlightData() {
    flights = await fetchFlights(depCityName, depCountryCode, destCityName, destCountryCode);
    returnFlights = await fetchFlights(destCityName, destCountryCode, depCityName, depCountryCode);
    console.log(returnFlights);
    setX(prevX => ++prevX);
    return
  }

  if (!x) fetchFlightData();
  dispatch(addFlights(flights));

  useEffect(() => {

    if (x === 1) {

      for (let i = 0; i < flights.length; i++) {
    
        let flight = flights[i];

        let depDateDetails = flight.departure.estimated;
        let arrDateDetails = flight.arrival.estimated;
        let depDate = new Date(depDateDetails);
        let arrDate = new Date(arrDateDetails);

        let timeOfFlight = (arrDate - depDate) / 36e5;
        let hours = Math.floor(timeOfFlight);
        let mins =  timeOfFlight - hours;
        mins *= 60;
        mins = Math.round(mins);
        
        let flightInfo = {
          depCity: depCityName,
          depDateTime: depDateDetails.split('T').join('  '),
          depAirport: flight.departure.airport,
          airline: flight.airline.name,
          destCity: destCityName,
          destDateTime: arrDateDetails.split('T').join('  '),
          destAirport: flight.arrival.airport,
          flightHours: hours,
          flightMins: mins
        }
        
        flightCards.push(<FlightCard flight={flightInfo} key={i} />)
        console.log(flightCards);
      }
      
      for (let i = 0; i < returnFlights.length; i++) {
        
        let returnFlight = returnFlights[i];
        
        let depDateDetails = returnFlight.departure.estimated;
        let arrDateDetails = returnFlight.arrival.estimated;
        let depDate = new Date(depDateDetails);
        let arrDate = new Date(arrDateDetails);

        let timeOfFlight = (arrDate - depDate) / 36e5;
        let hours = Math.floor(timeOfFlight);
        let mins =  timeOfFlight - hours;
        mins *= 60;
        mins = Math.round(mins);

        let returnFlightInfo = {
          depCity: destCityName,
          depDateTime: depDateDetails.split('T').join('  '),
          depAirport: returnFlight.departure.airport,
          airline: returnFlight.airline.name,
          destCity: depCityName,
          destDateTime: arrDateDetails.split('T').join('  '),
          destAirport: returnFlight.arrival.airport,
          flightHours: hours,
          flightMins: mins
        }
        
        returnFlightCards.push(<FlightCard flight={returnFlightInfo} key={i} />)
      }

      setX(prevX => ++prevX);
    }

  }, [x])
  

  if (showFlights === 'going') {
    return (
      <>
      <button onClick={() => setShowFlights('return')}>Show Return Flights</button>
      <div>{flightCards}</div>
      </>
    )
  } else if (showFlights === 'return') {
    return (
      <>
      <button onClick={() => setShowFlights('going')}>Show Going Flights</button>
      <div>{returnFlightCards}</div>
      </>
    )
  } else {
    return x > 0
      ? <div><button onClick={() => setShowFlights('going')}>Show Going Flights</button> <button onClick={() => setShowFlights('return')}>Show Return Flights</button></div>
      : <div>bionerwu</div>
  }  
};

export default Flights;
