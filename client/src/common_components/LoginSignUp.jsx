import React from 'react';
import NavBar from './NavBar';
import axios from 'axios';

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

  onSubmitClick() {
    axios.post(`/${this.props.loginOrSignUp}`, {
      name: this.state.user,
      password: this.state.pass
    })
    .then(result => {
      window.location.href = result.data;
    })
  }


  render() {
    return (
     <div className="loginApp">
       <NavBar />
       <h2>{this.props.title}</h2>
       <div className="userPass">
         Username: <input onChange={this.onInputChange} className="user" />
         Password: <input onChange={this.onInputChange} className="pass" />
       </div>
       <button onClick={this.onSubmitClick}>Submit</button>
     </div>
   );
  }
} 

export default LoginSignUp;