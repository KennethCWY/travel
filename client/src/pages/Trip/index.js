import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import {
    HotelCard,
    RestaurantCard,
    AttractionCard,
    CommentsForm,
    Comments
} from '../../components';
import './style.css';

const Trip = () => {
    const { tripId } = useParams();
    const [trip, setTrip] = useState({});
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [comments, setComments] = useState([]);
    const [tripCardId, setTripCardId] = useState();
    const [userReactions, setUserReactions] = useState(null);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const getCurrentUserReactions = async () => {
            const currentUserId = Number(localStorage.getItem('user_id'));
            const { data } = await axios.get(
                'http://localhost:8000/api/experience_reactions/'
            );
            const userReactions = await data?.filter(
                reaction => reaction.user === currentUserId
            );
            setUserReactions(userReactions);
        };

        getCurrentUserReactions();
    }, []);

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

                setComments(data.comments);
                setTripCardId(data.id);
            } catch (error) {
                console.error('GET TRIP DETAILS ', error);
            }
        };

        getTripInfo();
    }, [tripId, rerender]);

    return (
        <div className="trip-container">
            <h1>{trip.destination}</h1>

            {/* Trip Dates */}
            <div className="flex-row">
                <Moment format="Do MMM YYYY">{trip.departureDate}</Moment>
                <span> - </span>
                <Moment format="Do MMM YYYY">{trip.returnDate}</Moment>
            </div>

            {/* Hotels */}
            {hotels.length ? <h2>Hotels</h2> : null}
            <div className="flex-container">
                {hotels.map(hotel => (
                    <HotelCard hotel={hotel} userReactions={userReactions} key={hotel.id} />
                ))}
            </div>

            {/* Restaurants */}
            {restaurants.length ? <h2>Restaurants</h2> : null}
            <div className="flex-container">
                {restaurants.map(restaurant => (
                    <RestaurantCard
                        restaurant={restaurant}
                        userReactions={userReactions}
                        key={restaurant.id}
                    />
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
                <CommentsForm trip={tripCardId} setRerender={setRerender} />

                <div>
                    {comments
                        .slice(0)
                        .reverse()
                        .map(comment => (
                            <Comments comment={comment} key={comment.id} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Trip;
