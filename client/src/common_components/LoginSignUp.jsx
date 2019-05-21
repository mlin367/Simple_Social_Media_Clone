import React from 'react';
import NavBar from './NavBar';
import { Mutation } from 'react-apollo';
import { SIGN_UP, LOGIN } from '../apollo/mutations';

class LoginSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.className] : e.target.value
    })
  }

  // onSubmitClick() {
  //   axios.post(`/${this.props.loginOrSignUp}`, {
  //     name: this.state.user,
  //     password: this.state.pass
  //   })
  //   .then(result => {
  //     window.location.href = result.data;
  //   })
  // }


  render() {
    return (
      <div className="loginApp">
        <NavBar />
        <h2>{this.props.title}</h2>
        <div className="userPass">
          Username: <input onChange={this.onInputChange} className="user" />
          Password: <input onChange={this.onInputChange} className="pass" />
        </div>
        <Mutation 
          mutation={this.props.title === "Login" ? LOGIN : SIGN_UP}
          variables={{name: this.state.user, password: this.state.pass }}
          onCompleted={user => window.location.href='/home.html'}
        >
          {mutation => (
            <button onClick={() => mutation()}>Submit</button>
          )}
        </Mutation>
     </div>
   );
  }
} 

export default LoginSignUp;