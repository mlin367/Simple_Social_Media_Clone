import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const FrontThread = ({ thread }) => (
  <div className="thread">
    <ApolloConsumer>
      {client => (
        <h3 onClick={() => {
          // client.writeData({ data: {
          //   currThreadId: thread.id
          // }})
          localStorage.setItem('currThreadId', thread.id);
          window.location.href = '/thread.html';
        }}>{thread.title}</h3>
      )}
    </ApolloConsumer>
    <div className="threadWrapper">
      <span className="threadUser">by {thread.user.name}</span>
      <span className="threadTime">{thread.createdAt} | </span>
      <span className="threadComments">{thread.comment_count}</span>
    </div>
  </div>
);

export default FrontThread;