import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { ADD_THREAD } from '../../../apollo/mutations';
import { GET_AUTH_STATUS } from '../../../apollo/queries';
import { Query, Mutation } from 'react-apollo';

class CreateThreadApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    }
  }

  render() {
    return (
      <div className="createThreadApp">
        <NavBar />
        <Query query={GET_AUTH_STATUS}>
          {({loading, error, data}) => {
            if (loading) return <h1>Loading...</h1>
            if (!data.isLoggedIn.status) window.location.href='/login.html';
            return (
              <Mutation 
                mutation={ADD_THREAD}
                variables={{title: this.state.title, description: this.state.description, userId: data.isLoggedIn.userId}}
                onCompleted={data => {
                  localStorage.setItem('currThreadId', data.addThread.id);
                  window.location.href='/thread.html';
                }}  
              >
                {mutation => (
                  <div className="createThread">
                    <h2>Create a Thread</h2>
                    <input onChange={(e) => this.setState({title: e.target.value})} placeholder="Title"></input>
                    <textarea onChange={(e) => this.setState({description: e.target.value})} placeholder="Text"></textarea>
                    <button onClick={() => mutation()}>Post</button>
                  </div>
                )}
              </Mutation>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default CreateThreadApp;