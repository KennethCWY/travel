import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addHotels } from '../../redux/actions';

const Accommodations = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { bounds, hotels, tripId } = useSelector(state => state);

    useEffect(() => {
        const setAccommodationData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const hotels = await getPlacesData('hotels', bounds.sw, bounds.ne);
            dispatch(addHotels(hotels));
        };

        setAccommodationData();
    }, [bounds, dispatch]);

    const addHotelToTrip = async ({ name, rating, num_reviews, photo }) => {
        const hotel = {
            trip: tripId,
            category: 'hotel',
            name,
            rating,
            review_count: num_reviews,
            image: photo ? photo.images.large.url : 'https://bit.ly/3BAUMBe'
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', hotel);
        } catch (error) {
            console.error('ADD HOTEL ', error);
        }
    };

    return (
        <div>
            {hotels?.map(hotel => (
                <div>
                    <img
                        src={
                            hotel.photo
                                ? hotel.photo.images.large.url
                                : 'https://bit.ly/3BAUMBe'
                        }
                        alt={hotel.name}
                    />
                    <h2>{hotel.name}</h2>
                    <p>Rating: {Number(hotel.rating)}</p>
                    <p>Reviews: {hotel.num_reviews}</p>
                    <p>Ranking: {hotel.ranking}</p>
                    <p>Price range: {hotel.price}</p>
                    <button onClick={() => addHotelToTrip(hotel)}>Add to Trip</button>
                </div>
            ))}
            <button onClick={() => history.push('/experiences')}>View Experiences</button>
        </div>
    );
};

export default Accommodations;
