import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import { ApolloProvider } from 'react-apollo';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Class RCTCxxModule']);

import AppNavigator from './App/components/AppNavigator';

import './App/utils/apollo';
import { APOLLO_CLIENT } from './App/utils/apollo';

import { AppProvider } from './App/components/Context/AppProvider';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // firebase things?
  }

  render() {
    return (
      <ApolloProvider client={APOLLO_CLIENT}>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  }
});
