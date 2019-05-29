import { render } from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../../apollo/apollo_client';
import CreateThreadApp from './components/CreateThreadApp';

render(
  <ApolloProvider client={client}>
    <CreateThreadApp />
  </ApolloProvider>,
  document.getElementById('root')
);