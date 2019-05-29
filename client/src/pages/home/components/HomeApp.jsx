import React from 'react';
import NavBar from '../../../common_components/NavBar';
import ThreadList from './ThreadList';
import { GET_THREADS } from '../../../apollo/queries';
import { Query } from 'react-apollo';
import { GET_AUTH_STATUS } from '../../../apollo/queries';

export default class HomeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_THREADS
      })
      .then(response => this.setState({ data: response.data.threads }));
  }

  render() {
    return (
      <div className="homeApp">
        <NavBar />
        <Query query={GET_AUTH_STATUS}>
          {({ loading, data }) => {
            if (loading) return null;
            return data.isLoggedIn.status ? (
              <button
                onClick={() => window.location.href = '/createthread.html'}
              >
                Create Thread
              </button>
            ) : null;
          }}
        </Query>
        <ThreadList data={this.state.data} />
      </div>
    );
  }
}
