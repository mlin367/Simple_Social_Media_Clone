import React from 'react';
import moment from 'moment';

const Comment = props => (
  <div className="comment">
    <div className="commentWrapper">
      <span>{props.comment.user.name} </span>
      |
      <span> {moment.utc(parseInt(props.comment.createdAt) + 0.000).local().fromNow()}</span>
    </div>
    <p>{props.comment.text}</p>
  </div>
);

export default Comment;