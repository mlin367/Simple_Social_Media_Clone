import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTH_STATUS } from '../../../apollo/queries';
import { gql } from "apollo-boost";

const GET_THREAD_ID = gql`
{
  currThreadId @client
}
`;

const ThreadApp = props => (
  <div className="threadApp">
    <NavBar />
    <h2>Thread Title</h2>
    <p>Description</p>
    <Query query={GET_AUTH_STATUS}>
      { ({ loading, data }) => {
        if (loading) return <h1>Loading</h1>
        return data.isLoggedIn.status ? <textarea placeholder='comment here'/> : <h3>You need to be logged in to comment</h3>;
      }}
    </Query>
    {/* <Query query={GET_THREAD_ID}>
      {({ data : { currThreadId }}) => (

      )}
    </Query> */}
  </div>
);

export default ThreadApp;