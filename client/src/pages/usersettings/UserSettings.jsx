import { render } from 'react-dom';
import React from 'react';
import UserSettingsApp from './components/UserSettingsApp';
import { ApolloProvider } from 'react-apollo';
import client from '../../apollo/apollo_client';

render(
  <ApolloProvider client={client}>
    <UserSettingsApp />
  </ApolloProvider>,
  document.getElementById('root')
);
