import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React, { PropsWithChildren, useMemo } from "react";
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAFBASE_API_URL!,
});
export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const client = useMemo(() => {
    const authMiddleWare = setContext(async (_, { headers }) => {
      const token = await fetch("/api/auth/token").then((res) => res.json());
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    });

    return new ApolloClient({
      link: from([authMiddleWare, httpLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
