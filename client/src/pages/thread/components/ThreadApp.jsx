import React from 'react';
import NavBar from '../../../common_components/NavBar';
import { Query, Mutation } from 'react-apollo';
import { GET_AUTH_STATUS, GET_THREAD_COMMENTS } from '../../../apollo/queries';
import { ADD_COMMENT } from '../../../apollo/mutations';
import Comment from '../../../common_components/Comment';

const submitComment = (text, userId) => (
  <Mutation
    mutation={ADD_COMMENT}
    variables={{ text, userId, threadId: localStorage.getItem('currThreadId') }}
    refetchQueries={() => [
      {
        query: GET_THREAD_COMMENTS,
        variables: { id: localStorage.getItem('currThreadId') }
      }
    ]}
  >
    {addComment => <button onClick={() => addComment()}>Submit</button>}
  </Mutation>
);

const commentPermission = (onChangeFunc, text) => (
  <Query query={GET_AUTH_STATUS}>
    {({ loading, data }) => {
      if (loading) return <h1>Loading</h1>;
      return data.isLoggedIn.status ? (
        <div className="commentText">
          <textarea onChange={onChangeFunc} placeholder="comment here" />
          {submitComment(text, data.isLoggedIn.userId)}
        </div>
      ) : (
        <h3>You need to be logged in to comment</h3>
      );
    }}
  </Query>
);

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
                <h2>{thread.title}</h2>
                <p>{thread.description}</p>
                {commentPermission(this.onInputChange, this.state.text)}
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
