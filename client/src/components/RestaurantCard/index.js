const RestaurantCard = ({ restaurant }) => {
    return (
        <div>
            <img src={restaurant.image} alt={restaurant.name} />
            <h2>{restaurant.name}</h2>
            <p>Rating: {Number(restaurant.rating)}</p>
            <p>Reviews: {restaurant.review_count}</p>
            <p>Ranking: {restaurant.ranking}</p>
            <p>Price range: {restaurant.price}</p>
            <p>Address: {restaurant.address}</p>
            {restaurant.website_link && <a href={restaurant.website_link}>Website</a>}
            {restaurant.tripadvisor_link && (
                <a href={restaurant.tripadvisor_link}>Tripadvisor link</a>
            )}
            {restaurant.cuisine && <p>Cuisine: {restaurant.cuisine}</p>}
        </div>
    );
};

export default RestaurantCard;
