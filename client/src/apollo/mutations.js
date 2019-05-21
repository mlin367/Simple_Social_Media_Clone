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
  login {
    status
  }
}
`;