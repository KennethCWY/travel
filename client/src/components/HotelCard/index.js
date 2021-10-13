const HotelCard = ({hotel}) => {
    return (
        <div>
                    <img src={hotel.image} alt={hotel.name} />
                    <h2>{hotel.name}</h2>
                    <p>Rating: {Number(hotel.rating)}</p>
                    <p>Reviews: {hotel.review_count}</p>
                    <p>Ranking: {hotel.ranking}</p>
                    <p>Price range: {hotel?.price}</p>
                    <div className="flex-row">
                        <button>Like</button>
                        <button>Dislike</button>
                    </div>
        </div>
    )
}

export default HotelCard
