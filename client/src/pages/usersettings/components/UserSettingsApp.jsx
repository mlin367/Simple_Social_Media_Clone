import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { Mutation, Query } from 'react-apollo';
import { UPDATE_PASSWORD } from '../../../apollo/mutations';
import { GET_USER } from '../../../apollo/queries';

class UserSettingsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      currPass: '',
      newPass: '',
      returnString: null
    }
  }

  render() {
    return (
      <div className="userSettings">
        <NavBar />
        <h1>Change Password</h1>
        {this.state.returnString ? <h2>{this.state.returnString}</h2> : null}
        Username: <input onChange={(e) => this.setState({ username: e.target.value})}/>
        Current Password: <input onChange={(e) => this.setState({ currPass: e.target.value})}/>
        New Password: <input onChange={(e) => this.setState({ newPass: e.target.value})} />
        <Mutation
          mutation={UPDATE_PASSWORD}
          variables={{name: this.state.username, password: this.state.currPass, newPassword: this.state.newPass}}
          onCompleted={({ updateUserPassword }) => this.setState({returnString: updateUserPassword.text})}
        >
          {mutation => (
            <button onClick={() => mutation()}>Change</button>
          )}
        </Mutation>
      </div>
    )
  }
};

export default UserSettingsApp;