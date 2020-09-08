import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client';
import { App } from './components/App';

const client = new ApolloClient<NormalizedCacheObject>({
  uri: 'https://api-job-listing.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
