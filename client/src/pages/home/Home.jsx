import { render } from 'react-dom';
import React from 'react';
import HomeApp from './components/HomeApp';
import { ApolloProvider, withApollo } from 'react-apollo';
import client from '../../apollo/apollo_client';

const AppWithClient = withApollo(HomeApp);

render(
  <ApolloProvider client={client}>
    <AppWithClient />
  </ApolloProvider>,
  document.getElementById('root')
);
