import useReactionInfo from '../../hooks/useReactionInfo';

const HotelCard = ({ hotel, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(hotel, userReactions);

    return (
        <div>
            <img src={hotel.image} alt={hotel.name} />
            <h2>{hotel.name}</h2>
            <p>Rating: {Number(hotel.rating)}</p>
            <p>Reviews: {hotel.review_count}</p>
            {hotel.ranking && <p>Ranking: {hotel.ranking}</p>}
            {hotel.price && <p>Price range: {hotel.price}</p>}

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

export default HotelCard;
