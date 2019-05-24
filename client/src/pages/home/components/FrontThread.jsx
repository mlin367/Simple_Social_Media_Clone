import React from 'react';

const FrontThread = ({ thread }) => (
  <div className="thread">
    <h3
      onClick={() => {
        localStorage.setItem('currThreadId', thread.id);
        window.location.href = '/thread.html';
      }}
    >
      {thread.title}
    </h3>

    <div className="threadWrapper">
      <span className="threadUser">by {thread.user.name}</span>
      <span className="threadTime">{thread.createdAt} | </span>
      <span className="threadComments">{thread.comment_count}</span>
    </div>
  </div>
);

export default FrontThread;
