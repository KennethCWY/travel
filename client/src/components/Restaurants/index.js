import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addRestaurants } from '../../redux/actions';
import './styles.css';

const Restaurants = () => {
    const dispatch = useDispatch();
    const { bounds, restaurants, tripId } = useSelector(state => state);

    useEffect(() => {
        const setRestaurantData = async () => {
            if (!bounds.sw && !bounds.ne) return;

            const restaurants = await getPlacesData('restaurants', bounds.sw, bounds.ne);
            const filteredRestaurants = restaurants.filter(({ photo, price }) => photo && price);
            dispatch(addRestaurants(filteredRestaurants));
        };

        setRestaurantData();
    }, [bounds, dispatch]);

    const addRestaurantToTrip = async restaurant => {
        const cuisine = restaurant?.cuisine.map(({ name }) => name);

        const restaurantInfo = {
            trip: tripId,
            category: 'restaurant',
            name: restaurant.name,
            rating: restaurant.rating,
            review_count: restaurant.num_reviews,
            image: restaurant.photo.images.large.url,
            address: restaurant.address,
            website_link: restaurant.website,
            tripadvisor_link: restaurant.web_url,
            cuisine: cuisine.join(', '),
            price: restaurant.price,
            ranking: restaurant.ranking
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', restaurantInfo);
        } catch (error) {
            console.error('ADD HOTEL ', error);
        }
    };

    return (
        <div className="d-flex flex-row flex-container">
            {restaurants?.map(restaurant => (
                <div className="container" key={restaurant.location_id}>
                    <img src={restaurant.photo.images.large.url} alt={restaurant.name} />
                    <h2>{restaurant.name}</h2>
                    <p>Rating: {Number(restaurant.rating)}</p>
                    <p>Reviews: {restaurant.num_reviews}</p>
                    <p>Ranking: {restaurant.ranking}</p>
                    <p>Price range: {restaurant.price}</p>
                    <p>Address: {restaurant.address}</p>
                    {restaurant.website && <a href={restaurant.website}>Website</a>}
                    {restaurant.web_url && <a href={restaurant.web_url}>Tripadvisor link</a>}
                    {restaurant?.cuisine.map(cuisine => (
                        <p key={cuisine.name}>{cuisine.name}</p>
                    ))}
                    <button onClick={() => addRestaurantToTrip(restaurant)}>
                        Add to Trip
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Restaurants;
