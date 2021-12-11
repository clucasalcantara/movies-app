import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import type { ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.API_URL as string,
}) as ApolloLink;


export const GraphQLClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
