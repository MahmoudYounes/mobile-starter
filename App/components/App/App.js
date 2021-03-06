import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Restaurants from '../Restaurants/Restaurants';

//import { AppProvider } from '../Context/AppProvider';
import { GRAPHQL_API_URL } from '../../utils/constants';

const httpLink = new HttpLink({ uri: GRAPHQL_API_URL });

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const middlewareLink = new ApolloLink((operation, forward) => {
  console.log('IN MIDDLEWARE');
  console.log('QUERY BODY');
  console.log(operation.query.loc.source.body);
  console.log('QUERY VARIABLES');
  console.log(operation.variables);
  return forward(operation)
});

const link = ApolloLink.from([
  middlewareLink,
  errorLink,
  httpLink,
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const AppNav = createStackNavigator(
  {
    Restaurants: {
      screen: Restaurants,
    },
  },
  {
    initialRouteName: 'Restaurants',
    navigationOptions: {
      header: null,
    }
  }
);

export const RootNavigator = createSwitchNavigator(
  {
    AppNav: {
      screen: AppNav,
      path: null
    },
  },
  {
    initialRouteName: 'AppNav',
    navigationOptions: {
      header: null
    },
  }
);

// appprovider 
const App = () => (
    <ApolloProvider client={client}>
        <RootNavigator style={{flex: 1}}/>
    </ApolloProvider>
);

export default App;
