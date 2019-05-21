import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:2400/graphql'
});

export default client;