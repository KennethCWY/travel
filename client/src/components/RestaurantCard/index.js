import useReactionInfo from "../../hooks/useReactionInfo";

const RestaurantCard = ({ restaurant, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(restaurant, userReactions);

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

            {/* Reactions */}
            <div className="flex-row">
                <span>{likeCount}</span>
                <button onClick={handleLike}>{userHasLiked ? 'Unlike' : 'Like'}</button>
                <span>{dislikeCount}</span>
                <button onClick={handleDislike}>
                    {userHasDisliked ? 'Neutral' : 'Dislike'}
                </button>
            </div>
        </div>
    );
};

export default RestaurantCard;
