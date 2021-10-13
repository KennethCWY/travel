import React from 'react';

const Comments = ({ comment }) => {
    return (
        <div id="comments-container">
            <p>{comment.body}</p>
        </div>
    );
};

export default Comments;
