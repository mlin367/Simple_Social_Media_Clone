import { render } from 'react-dom';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import client from '../../apollo/apollo_client';
import MyCommentsApp from './components/MyCommentsApp';

render(
  <ApolloProvider client={client}>
    <MyCommentsApp />
  </ApolloProvider>,
  document.getElementById('root')
);