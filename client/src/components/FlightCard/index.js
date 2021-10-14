import React from "react"

import "./style.css";


function FlightCard({flight}) {

    return (
        <div className='grid-container'>
            <div>{flight.depCity}</div>
            <div> <p id='flight-time'>{flight.flightHours}h {flight.flightMins}mins</p> <span id='arrow'>&#10230;</span> </div>
            <div>{flight.destCity}</div>
            <div>{flight.depDateTime}</div>
            <div>{flight.airline}</div>
            <div>{flight.destDateTime}</div>
            <div>{flight.depAirport}</div>
            <div>Price:</div>
            <div>{flight.destAirport}</div>
        </div>
    )
}

export default FlightCard
