import React from 'react';
import moment from 'moment';

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
      <span className="threadTime"> {moment.utc(parseInt(thread.createdAt) + 0.000).local().fromNow()} | </span>
      <span className="threadComments">{thread.comment_count} comments</span>
    </div>
  </div>
);

export default FrontThread;
