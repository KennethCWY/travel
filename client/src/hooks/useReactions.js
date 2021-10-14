import axios from 'axios';
import { useState } from 'react';

const useReactions = (experience, userReactions) => {
    // The reaction for this specific experience. If there's no reaction it should have a null value.
    const existingReaction = userReactions?.find(reaction => reaction.experience === experience.id);

    const [userReaction, setUserReaction] = useState(existingReaction);

    const likeExperience = async () => {
        // Create a new reaction for this experience if one doesn't already exist.
        if (!userReaction) {
            try {
                const reaction = {
                    user: localStorage.getItem('user_id'),
                    experience: experience.id,
                    like: true,
                    dislike: false,
                    timestamp: new Date()
                };

                const { data } = await axios.post(
                    'http://localhost:8000/api/experience_reactions/',
                    reaction
                );
                setUserReaction(data);
            } catch (error) {
                console.error('LIKE EXPERIENCE ', error);
            }

            // If an experience has already been liked, remove the like.
        } else if (userReaction.like) {
            try {
                const { data } = await axios.patch(
                    `http://localhost:8000/api/experience_reactions/${userReaction.id}/`,
                    { like: false }
                );
                setUserReaction(data);
            } catch (error) {
                console.error('REMOVE LIKE EXPERIENCE ', error);
            }

            // If an experience hasn't been liked or if it has already been disliked, add a like to it and remove the dislike.
        } else if (!userReaction.like || userReaction.dislike) {
            try {
                const { data } = await axios.patch(
                    `http://localhost:8000/api/experience_reactions/${userReaction.id}/`,
                    { like: true, dislike: false }
                );
                setUserReaction(data);
            } catch (error) {
                console.error('LIKE EXPERIENCE WITH EXISTING REACTION ', error);
            }
        }
    };

    const dislikeExperience = async () => {
        // Create a new reaction for this experience if one doesn't already exist.
        if (!userReaction) {
            try {
                const reaction = {
                    user: localStorage.getItem('user_id'),
                    experience: experience.id,
                    like: false,
                    dislike: true,
                    timestamp: new Date()
                };

                const { data } = await axios.post(
                    'http://localhost:8000/api/experience_reactions/',
                    reaction
                );
                setUserReaction(data);
                console.log('data: ', data);
            } catch (error) {
                console.error('DISLIKE EXPERIENCE ', error);
            }

            // If an experience has already been disliked, remove the dislike.
        } else if (userReaction.dislike) {
            try {
                const { data } = await axios.patch(
                    `http://localhost:8000/api/experience_reactions/${userReaction.id}/`,
                    { dislike: false }
                );
                setUserReaction(data);
            } catch (error) {
                console.error('REMOVE DISLIKE EXPERIENCE ', error);
            }

            // If an experience hasn't been disliked or if it has already been liked, add a dislike to it and remove the like.
        } else if (!userReaction.dislike || userReaction.like) {
            try {
                const { data } = await axios.patch(
                    `http://localhost:8000/api/experience_reactions/${userReaction.id}/`,
                    { dislike: true, like: false }
                );
                setUserReaction(data);
            } catch (error) {
                console.error('DISLIKE EXPERIENCE WITH EXISTING REACTION ', error);
            }
        }
    };

    return { likeExperience, dislikeExperience };
};

export default useReactions;
