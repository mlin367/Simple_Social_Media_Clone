import React from 'react';
import NavBar from '../../../common_components/NavBar';
import ThreadList from './ThreadList';
import { GET_THREADS } from '../../../apollo/queries';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.client.query({
      query: GET_THREADS
    }).then(response => this.setState({ data: response.data.threads }));
  }

  render() {
    return (
      <div className="homeApp">
        <NavBar />
        <ThreadList data={this.state.data}/>
      </div>
    )
  }
}
