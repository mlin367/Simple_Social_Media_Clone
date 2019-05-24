import React from 'react';

const Comment = props => (
  <div className="comment">
    <div className="commentWrapper">
      <span>{props.comment.user.name}</span>
      |
      <span>{props.comment.createdAt}</span>
    </div>
    <p>{props.comment.text}</p>
  </div>
);

export default Comment;