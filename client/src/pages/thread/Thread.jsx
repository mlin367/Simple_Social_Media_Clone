import { render } from 'react-dom';
import React from 'react';
import ThreadApp from './components/ThreadApp';
import { ApolloProvider } from 'react-apollo';
import client from '../../apollo/apollo_client';

render(
  <ApolloProvider client={client}>
    <ThreadApp />
  </ApolloProvider>,
  document.getElementById('root')
);
