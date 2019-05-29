import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTH_STATUS, GET_THREAD_COMMENTS } from '../../../apollo/queries';
import { ADD_COMMENT } from '../../../apollo/mutations';
import Comment from '../../../common_components/Comment';
import moment from 'moment';

class ThreadApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  render() {

    const submitComment = userId => (
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ text: this.state.text, userId, threadId: localStorage.getItem('currThreadId') }}
        refetchQueries={() => [
          {
            query: GET_THREAD_COMMENTS,
            variables: { id: localStorage.getItem('currThreadId') }
          }
        ]}
      >
        {addComment => <button onClick={() => {
          addComment();
          this.setState({
            text: ''
          });
        }}>Submit</button>}
      </Mutation>
    );

    const commentPermission = (
      <Query query={GET_AUTH_STATUS}>
        {({ loading, data }) => {
          if (loading) return <h1>Loading</h1>;
          return data.isLoggedIn.status ? (
            <div className="commentText">
              <textarea value={this.state.text} onChange={this.onInputChange} placeholder="comment here" />
              {submitComment(data.isLoggedIn.userId)}
            </div>
          ) : (
            <h3>You need to be logged in to comment</h3>
          );
        }}
      </Query>
    );
    
    return (
      <div className="threadApp">
        <NavBar />
        <Query
          query={GET_THREAD_COMMENTS}
          variables={{ id: localStorage.getItem('currThreadId') }}
        >
          {({ loading: loading1, data: { thread } }) => {
            if (loading1) return <h1>Loading...</h1>;
            return (
              <React.Fragment>
                <div className="threadPostWrapper">
                  <span className="threadUser">Posted by {thread.user.name}</span>
                  <span className="threadTime"> {moment.utc(parseInt(thread.createdAt) + 0.000).local().fromNow()} | </span>
                  <span className="threadComments">{thread.comment_count} comments</span>
                </div>
                <h2>{thread.title}</h2>
                <p>{thread.description}</p>
                {commentPermission}
                <h3>Comments</h3>
                {thread.comments.map(comment => (
                  <Comment comment={comment} key={Math.random()} />
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default ThreadApp;
