import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";
import theme from "../theme";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  Query,
} from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: { 
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                if (!result.login) return query;
                else {
                  return {
                    me: result.login,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
