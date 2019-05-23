import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:2400/graphql',
  clientState: {
    defaults: {
      currThreadId: 1
    },
    resolvers: {}
  }
});

export default client;