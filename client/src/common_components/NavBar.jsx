import React from 'react';

const NavBar = props => {

  const signedIn = <div className="dropDown">
    <span className="userName">{props.userName}</span>
    <div className="dropDown-content">
        <a>User Settings</a>
        <a>My Comments</a>
        <a>Log Out</a>
    </div>
  </div>

  const notSignedIn = <div className="loginSignup">
  <span>Login</span>
  <span>Sign Up</span>
</div>

  return (
    <div className="navbar">
      <h1>Otakus Unite</h1>
      {props.userName ? signedIn : notSignedIn}
    </div>
  )
};

export default NavBar;