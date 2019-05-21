import { render } from 'react-dom';
import React from 'react';
import App from './components/App';
import { ApolloProvider, withApollo } from 'react-apollo';
import client from '../../apollo/apollo_client';

const AppWithClient = withApollo(App);

render(
  <ApolloProvider client={client}>
    <AppWithClient />
  </ApolloProvider>,
  document.getElementById('root')
);
