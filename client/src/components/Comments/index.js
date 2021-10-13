import React from 'react';

const Comments = props => {
    return (
        <div>
            <div id="comments-container">{props.comments}</div>
        </div>
    );
};

export default Comments;
