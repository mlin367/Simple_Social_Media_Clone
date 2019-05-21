import React from 'react';
import { Query } from 'react-apollo';
import { GET_USER, GET_AUTH_STATUS } from '../apollo/queries';

const signedIn = user => {
  return (
  <div className="dropDown">
    <span className="userName">{user}</span>
    <div className="dropDown-content">
      <a>User Settings</a>
      <a>My Comments</a>
      <a>Log Out</a>
    </div>
  </div>
  )
};

const notSignedIn = (
  <div className="loginSignup">
    <span>Login</span>
    <span>Sign Up</span>
  </div>
);

const NavBar = props => (
  <Query query={GET_AUTH_STATUS}>
    {({ loading: loading1, error, data: { status } }) => {
      <Query query={GET_USER}>
        {({ loading: loading2, error: error2, data: { user } }) => {
          if (loading1 || loading2) return <h1>Loading...</h1>
          if (error || error2) return <h1>Error!</h1>
          return (
            <div className="navbar">
              <h1>Otakus Unite</h1>
              {status ? signedIn(user) : notSignedIn}
            </div>
          )
        }}
      </Query>
    }}
  </Query>
);

export default NavBar;
