import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPlacesData } from '../../apis/places';
import { addAttractions } from '../../redux/actions';
import './styles.css';

const Attractions = () => {
    const dispatch = useDispatch();
    const { bounds, attractions, tripId } = useSelector(state => state);

    useEffect(() => {
        const setAttractionData = async () => {
            if (!bounds.sw && !bounds.ne) return;
            const attractions = await getPlacesData('attractions', bounds.sw, bounds.ne);
            const filteredAttractions = attractions.filter(attractions => attractions.photo);
            dispatch(addAttractions(filteredAttractions));
        };

        setAttractionData();
    }, [bounds, dispatch]);

    const addAttractionToTrip = async (attraction) => {
        const attractionInfo = {
            trip: tripId,
            category: 'attraction',
            name: attraction.name,
            rating: attraction.rating,
            review_count: attraction.num_reviews,
            image: attraction.photo.images.large.url,
            address: attraction.address,
            website_link: attraction.website,
            tripadvisor_link: attraction.web_url,
            price: attraction.price,
            ranking: attraction.ranking
        };

        try {
            await axios.post('http://localhost:8000/api/experiences/', attractionInfo);
        } catch (error) {
            console.error('ADD ATTRACTION ', error);
        }
    };

    return (
        <div className="d-flex flex-row flex-container">
            {attractions?.map(attraction => (
                <div className="container" key={attraction.location_id}>
                    <img src={attraction.photo.images.large.url} alt={attraction.name} />
                    <h2>{attraction.name}</h2>
                    <p>Rating: {Number(attraction.rating)}</p>
                    <p>Reviews: {attraction.num_reviews}</p>
                    <p>Ranking: {attraction.ranking}</p>
                    <p>Address: {attraction.address}</p>
                    {/* <p>Description: {attraction.description}</p> */}
                    {attraction.website && <a href={attraction.website}>Website</a>}
                    <br/>
                    {attraction.web_url && <a href={attraction.web_url}>Tripadvisor link</a>}
                    <br/>
                    <button onClick={() => addAttractionToTrip(attraction)}>
                        Add to Trip
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Attractions;