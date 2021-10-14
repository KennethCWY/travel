import axios from 'axios';
import { useEffect, useState } from 'react';
import useReactions from './useReactions';

const useReactionInfo = (experience, userReactions) => {
    const { likeExperience, dislikeExperience } = useReactions(experience, userReactions);

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [userHasDisliked, setUserHasDisliked] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        const getReactionInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/experiences/${experience.id}/`);

                const currentUserId = Number(localStorage.getItem('user_id'));
                const userHasLiked = data.reactions.find(reaction => reaction.like && reaction.user === currentUserId);
                const userHasDisliked = data.reactions.find(reaction => reaction.dislike && reaction.user === currentUserId);
                const likes = data.reactions.filter(reaction => reaction.like);
                const dislikes = data.reactions.filter(reaction => reaction.dislike);

                setUserHasLiked(userHasLiked);
                setUserHasDisliked(userHasDisliked);
                setLikeCount(likes.length);
                setDislikeCount(dislikes.length);
            } catch (error) {
                console.error('GET EXPERIENCE DATA ', error);
            }
        };

        getReactionInfo();
    }, [experience.id, rerender]);

    const handleLike = () => {
        likeExperience();
        setRerender(!rerender);
    };

    const handleDislike = () => {
        dislikeExperience();
        setRerender(!rerender);
    };

    return {
        likeCount,
        dislikeCount,
        userHasLiked,
        userHasDisliked,
        handleLike,
        handleDislike
    };
};

export default useReactionInfo;
