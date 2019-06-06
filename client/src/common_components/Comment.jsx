import React from 'react';
import moment from 'moment';

const Comment = props => (
  <div onClick={props.haveOnClick ? () => {
    localStorage.setItem('currThreadId', props.comment.thread.id);
    window.location.href='/thread.html';
  } : null} 
  className="comment"
  >
    <div className="commentWrapper">
      <span>{props.comment.user.name} </span>
      |
      <span> {moment.utc(parseInt(props.comment.createdAt) + 0.000).local().fromNow()}</span>
    </div>
    <p>{props.comment.text}</p>
  </div>
);

export default Comment;