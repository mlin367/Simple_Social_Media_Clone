import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import { ApolloProvider, withApollo } from 'react-apollo';
import ApolloClient from 'apollo-boost';

const AppWithClient = withApollo(App);

const client = new ApolloClient({
  uri: 'http://localhost:2400/graphql'
});

render(
  <ApolloProvider client={client}>
    <AppWithClient />
  </ApolloProvider>,
  document.getElementById('root')
);
