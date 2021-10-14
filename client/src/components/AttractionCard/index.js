import useReactionInfo from '../../hooks/useReactionInfo';

const AttractionCard = ({ attraction, userReactions }) => {
    const {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    } = useReactionInfo(attraction, userReactions);

    return (
        <div>
            <img src={attraction.image} alt={attraction.name} />
            <h2>{attraction.name}</h2>
            <p>Rating: {Number(attraction.rating)}</p>
            <p>Reviews: {attraction.review_count}</p>
            <p>Ranking: {attraction.ranking}</p>
            <p>Address: {attraction.address}</p>
            <p>{attraction.website_link && <a href={attraction.website_link}>Website</a>}</p>
            <p>
                {attraction.tripadvisor_link && (
                    <a href={attraction.tripadvisor_link}>Tripadvisor link</a>
                )}
            </p>
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

export default AttractionCard;
