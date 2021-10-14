import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const CommentsForm = props => {
    const [comment, setComment] = useState();

    const updateComment = e => {
        setComment(e.target.value);
    };

    async function handleSubmit(e) {
        try {
            e.preventDefault();

            const body = e.target.comment.value;
            const timestamp = Date.now();
            const user = localStorage.getItem('user_id');
            const tripId = props.trip;

            const token = localStorage.getItem('access_token');
            const commentData = {
                trip: tripId,
                user: user,
                body: body,
                timestamp: timestamp
            };

            const { data } = await axios.post(
                `http://localhost:8000/api/comments/`,
                commentData,
                {
                    headers: {
                        Authorization: `JWT ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }

        setComment('');
        props.setRerender(prev => !prev);
    }
    return (
        <div>
            <h3>Share your thoughts below</h3>
            <form id="comment-form" onSubmit={handleSubmit}>
                <textarea
                    id="comment"
                    name="comment"
                    aria-label="comment"
                    placeholder="Type your comment here"
                    value={comment}
                    onChange={updateComment}
                    required
                ></textarea>
                <button id="submit-btn" type="submit">
                    Post
                </button>
            </form>
        </div>
    );
};

export default CommentsForm;
