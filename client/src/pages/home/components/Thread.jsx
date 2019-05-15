import React from 'react';

const Thread = ({ thread }) => (
  <div className="thread">
    <h2>{thread.title}</h2>
    <div className="threadWrapper">
      <span className="threadUser">by {thread.user.name}</span>
      <span className="threadTime">{thread.createdAt} |</span>
      <span className="threadComments">{thread.comment_count}</span>
    </div>
  </div>
);

export default Thread;