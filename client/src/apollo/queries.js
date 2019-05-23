import { gql } from "apollo-boost";

export const GET_THREADS = gql`
{
  threads {
    id
    title
    createdAt
    comment_count
    user {
      name
    }
  }
}
`;

export const GET_AUTH_STATUS = gql`
{
  isLoggedIn {
    status,
    userId
  }
}
`;

export const GET_USER = gql`
query ($id: ID!) {
  user(id: $id) {
    name
  }
}
`;

export const GET_THREAD_COMMENTS = gql`
query ($id: ID!) {
  thread(id: $id) {
    comments {
      text
      createdAt
      user {
        name
      }
    }
  }
}
`;
