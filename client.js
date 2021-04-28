import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getTokenFromStorage } from "./src/utils/token";

const authenticationHeaders = setContext((_, {headers}) => {

    const token = getTokenFromStorage("auth"); //need to pass in a key for the value stored
    if (token) {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${token}`
            }
        }
    }
});

const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql"
});

const errors = onError(({ graphQLErrors, networkError }) => {

    if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
})

const client = new ApolloClient({
    link: errors.concat(authenticationHeaders.concat(httpLink)),
    cache: new InMemoryCache(),
    credentials: 'include'
});

export { client }