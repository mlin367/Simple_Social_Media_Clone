import { gql } from "apollo-boost";

export const SIGN_UP = gql`
mutation ($name: String!, $password: String!) {
  addUser(name: $name, password: $password) {
    name
  }
}
`;

export const LOGIN = gql`
mutation ($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    name
  }
}
`;

export const LOGOUT = gql`
mutation {
  logout {
    status
  }
}
`;

export const ADD_COMMENT = gql`
mutation ($text: String!, $userId: ID!, $threadId: ID!) {
  addComment(text: $text, userId: $userId, threadId: $threadId) {,
    id
    text
  }
}
`;