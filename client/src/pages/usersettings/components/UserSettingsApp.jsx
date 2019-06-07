import React from 'react';
import NavBar from '../../../common_components/NavBar';

class UserSettingsApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPass: '',
      newPass: '',
    }
  }

  render() {
    return (
      <div className="userSettings">
        <NavBar />
        <h1>Change Password</h1>
        Current Password: <input onChange={(e) => this.setState({ currPass: e.target.value})}/>
        New Password: <input onChange={(e) => this.setState({ newPass: e.target.value})} />
        <button>Change</button>
      </div>
    )
  }
};

export default UserSettingsApp;