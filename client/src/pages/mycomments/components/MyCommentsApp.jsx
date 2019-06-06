import React from 'react';
import NavBar from '../../../common_components/NavBar';
import Comment from '../../../common_components/Comment';
import {GET_USER_COMMENTS, GET_AUTH_STATUS} from '../../../apollo/queries';
import { Query } from 'react-apollo';

const MyCommentsApp = props => (
  <div className="myComments">
    <NavBar />
    <Query query={GET_AUTH_STATUS}>
      {({loading, data}) => {
        if (loading) return <h1>Loading...</h1>
        if (!data.isLoggedIn.status) window.location.href = '/login.html';
        return (
          <Query
            query={GET_USER_COMMENTS}
            variables={{id: data.isLoggedIn.userId}}
          >
            {({loading: loading1, data: data2}) => {
              if (loading1) return <h1>Loading...</h1>
              return data2.user.comments.map((comment, id) => (
                <Comment haveOnClick={true} comment={comment} key={Math.random() * id}/>
              ))
            }}
          </Query>
        )
      }}
    </Query>
  </div>
);

export default MyCommentsApp;

