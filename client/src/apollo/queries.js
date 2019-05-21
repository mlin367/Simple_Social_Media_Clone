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
    status
  }
}
`;

export const GET_USER = gql`
{
  user($id: ID!) {
    name
  }
}
`;

