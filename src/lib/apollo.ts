import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("auth") || "{}").state.token;

  return {
    headers: {
      ...headers,
      authorization: token || ""
    }
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_APP_WSS
  })
);

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APP_API
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
