import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { HotelCard } from '../../components';
import './style.css';

const Trip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [attractions, setAttractions] = useState([]);

    useEffect(() => {
        const getTripInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/trips/${tripId}/`);
                setTrip(data);
                setHotels(data.experiences.filter(experience => experience.category === 'hotel'));
                setRestaurants(data.experiences.filter(experience => experience.category === 'restaurant'));
                setAttractions(data.experiences.filter(experience => experience.category === 'attraction'));
            } catch (error) {
                console.error('GET TRIP DETAILS ', error);
            }
        };

        getTripInfo();
    }, [tripId]);

    return (
        <div className="trip-container">
            <h1>{trip.destination}</h1>

            {/* Trip Details */}
            <div className="flex-row">
                <Moment format="Do MMM YYYY">{trip.departureDate}</Moment>
                <span> - </span>
                <Moment format="Do MMM YYYY">{trip.returnDate}</Moment>
            </div>

            {/* Hotels */}
            <div className="flex-container">
                {hotels.map(hotel => (
                    <HotelCard hotel={hotel} key={hotel.id} />
                ))}
            </div>
        </div>
    );
};

export default Trip;
