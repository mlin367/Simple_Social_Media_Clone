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

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null
    }
  }

  async componentDidMount() {
    const result = await axios.get('/checkSession');
    this.setState({
      session: result.data
    })
    console.log(result.data)
  }

  render() {
    return (
      <div className="navbar">
    <h1>Otakus Unite</h1>
    {this.state.session ? signedIn(this.state.session) : notSignedIn}
  </div>
    )
  }
}

// const NavBar = props => (
//   <div className="navbar">
//     <h1>Otakus Unite</h1>
//     {checkSession() ? signedIn : notSignedIn}
//   </div>
// );

export default NavBar;
