import React from 'react';
import axios from 'axios';

const checkSession = async () => {
  const result = await axios.get('/checkSession');
  return result;
}

const result = checkSession();

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
  <div className="navbar">
    <h1>Otakus Unite</h1>
    {checkSession() ? signedIn : notSignedIn}
  </div>
);

export default NavBar;
