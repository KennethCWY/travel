import React from 'react';

const Comments = ({ comment }) => {
    // const originalOrder = comment.body.revere()

    return (
        <div id="comments-container">
            <p>{comment.body}</p>
        </div>
    );
};

export default Comments;
