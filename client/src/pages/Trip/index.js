import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { HotelCard, AttractionCard, CommentsForm, Comments } from '../../components';
import './style.css';

const Trip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [comments, setComments] = useState();

    useEffect(() => {
        const getTripInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/trips/${tripId}/`);
                setTrip(data);
                setHotels(
                    data.experiences.filter(experience => experience.category === 'hotel')
                );
                setRestaurants(
                    data.experiences.filter(experience => experience.category === 'restaurant')
                );
                setAttractions(
                    data.experiences.filter(experience => experience.category === 'attraction')
                );
                setComments(data.comments.body);
                console.log(comments);
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

            {/* Attractions */}
            {attractions.length ? <h2>Attractions</h2> : null}
            <div className="flex-container">
                {attractions.map(attraction => (
                    <AttractionCard attraction={attraction} key={attraction.id} />
                ))}
            </div>

            {/* Comments */}
            <div>
                <CommentsForm tripId={tripId} />
                {comments}
                {/* {comments.map(comment => (
                    <Comments comment={comment} key={comment.id} />
                ))} */}
            </div>
        </div>
    );
};

export default Trip;
