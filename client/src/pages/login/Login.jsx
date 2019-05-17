import { render } from 'react-dom';
import React from 'react';
import LoginSignUp from '../../common_components/LoginSignUp';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:2400/graphql'
});

render(
  // <ApolloProvider client={client}>
    <LoginSignUp title='Login' loginOrSignUp='Login'/>,
  // </ApolloProvider>,
  document.getElementById('root')
);
