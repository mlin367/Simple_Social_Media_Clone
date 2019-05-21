import { render } from 'react-dom';
import React from 'react';
import LoginSignUp from '../../common_components/LoginSignUp';
import { ApolloProvider } from 'react-apollo';
import client from '../../apollo/apollo_client';

render(
  <ApolloProvider client={client}>
    <LoginSignUp title="Sign Up" loginOrSignUp='signup'/>,
  </ApolloProvider>,
  document.getElementById('root')
);
