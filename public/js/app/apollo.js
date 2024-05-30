import { ApolloClient, HttpLink, ApolloLink } from '@apollo/client';
import fetch from 'cross-fetch';

import entitiesCache from './entitiesCache';

const entitiesHttpLink = new HttpLink({
  fetch,
  uri: () => {
    return `http://api.dev.org:3000/v1/account/1/entities-graphql`;
  },
  credentials: 'include',
});

export const entitiesClient = new ApolloClient({
  cache: entitiesCache,
  link: ApolloLink.from([entitiesHttpLink]),

  credentials: 'include',

  // https://www.apollographql.com/docs/react/api/core/ApolloClient/#example-defaultoptions-object
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
