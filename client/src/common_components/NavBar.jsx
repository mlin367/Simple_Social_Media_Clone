import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_USER, GET_AUTH_STATUS } from '../apollo/queries';
import { LOGOUT } from '../apollo/mutations';

const signedIn = user => (
  <Mutation 
    mutation={LOGOUT}
    onCompleted={result => window.location.reload()}
  >
    {mutation => (
      <div className="dropDown">
        <span className="userName">{user}</span>
        <div className="dropDown-content">
          <a>User Settings</a>
          <a>My Comments</a>
          <a onClick={() => mutation()}>Log Out</a>
        </div>
      </div>
    )}
  </Mutation>
);

const notSignedIn = (
  <div className="loginSignup">
    <span onClick={() => window.location.href='/login.html'}>Login</span>
    <span onClick={() => window.location.href='/signup.html'}>Sign Up</span>
  </div>
);

const NavBar = props => (
  <Query query={GET_AUTH_STATUS}>
    {({ loading: loading1, error, data: { isLoggedIn } }) => {
      if (loading1) return <h1>Loading...</h1>;
      if (error) return <h1>Error 1</h1>;
      if (isLoggedIn) {
        return (
          <Query query={GET_USER} variables={{ id: isLoggedIn.userId }}>
            {({ loading: loading2, error: error2, data: { user } }) => {
              console.log(isLoggedIn);
              if (loading2) return <h1>Loading...</h1>;
              if (error2) return <h1>Error 2</h1>;
              return (
                <div className="navbar">
                  <h1>Otakus Unite</h1>
                  {isLoggedIn.status ? signedIn(user.name) : notSignedIn}
                </div>
              );
            }}
          </Query>
        );
      }
    }}
  </Query>
);

export default NavBar;
