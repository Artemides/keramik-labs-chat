import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { SSELink, isLiveQuery } from "@grafbase/apollo-link";
import { getOperationAST } from "graphql";
import React, { PropsWithChildren, useMemo } from "react";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL!,
});

const sseLink = new SSELink({ uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL! });

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    const authMiddleWare = setContext(async (_, { headers }) => {
      const { token } = await fetch("/api/auth/token").then((res) =>
        res.json()
      );

      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([
        authMiddleWare,
        split(
          ({ query, operationName, variables }) =>
            isLiveQuery(getOperationAST(query, operationName)),
          sseLink,
          httpLink
        ),
      ]),

      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
