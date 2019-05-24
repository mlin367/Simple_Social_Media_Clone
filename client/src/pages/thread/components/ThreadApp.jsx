import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTH_STATUS, GET_THREAD_COMMENTS } from '../../../apollo/queries';
import { gql } from 'apollo-boost';

const commentPermission = (
  <Query query={GET_AUTH_STATUS}>
    {({ loading, data }) => {
      if (loading) return <h1>Loading</h1>;
      return data.isLoggedIn.status ? (
        <textarea placeholder="comment here" />
      ) : (
        <h3>You need to be logged in to comment</h3>
      );
    }}
  </Query>
);

const ThreadApp = props => (
  <div className="threadApp">
    <NavBar />
    <Query
      query={GET_THREAD_COMMENTS}
      variables={{ id: localStorage.getItem('currThreadId') }}
    >
      {({ loading: loading1, data: { thread } }) => {
        if (loading1) return <h1>Loading...</h1>;
        return (
          <React.Fragment>
            <h2>{thread.title}</h2>
            <p>{thread.description}</p>
            {commentPermission}
            <h3>Comments</h3>
            {thread.comments.map(comment => (
              <p>{comment.text}</p>
            ))}
          </React.Fragment>
        );
      }}
    </Query>
  </div>
);

export default ThreadApp;
