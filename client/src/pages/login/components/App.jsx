import React from 'react';
import NavBar from '../../../common_components/NavBar';
import axios from 'axios';

class App extends React.component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
    }
  }

  onInputChange(e) {
    this.setState({
      [e.target.className] : e.target.value
    })
  }

  onSubmitClick() {
    axios.post(`/${props.loginOrSignUp}`, {
      name: this.state.user,
      password: this.state.pass
    })
  }


  render() {
    return (
     <div className="loginApp">
       <NavBar />
       <h2>{props.loginOrSignUp}</h2>
       <div className="userPass">
         Username: <input className="user" />
         Password: <input className="pass" />
       </div>
       <button>Submit</button>
     </div>
   );
  }
} 

export default App;