import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewPagerAndroid
} from 'react-native';
import Swiper from 'react-native-swiper';

import { Query } from 'react-apollo';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';
//import RestaurantsList  from './RestaurantsList';
import Restaurant from './Restaurant';

export default class Restaurants extends React.Component {
  state = {
  };

  render() {
    // TODO: This shouldn't be hard coded.  Allow the user to enter it into a Text Input
    const address = '1260 6th Ave, New York, NY 10020';

    return (
      <View style={{marginTop: 50}}>
        <Query
          query={RESTAURANT_SEARCH_QUERY}
          variables={{
            address
          }}>

          {({ loading, error, data = {} }) => {
            if (loading) {
              return (
                <View style={{ width: '100%', paddingVertical: 10, alignContent: "center" }}>
                  <Text style={{alignSelf:"center"}}>Loading...</Text>
                  <ActivityIndicator size="large" style={{ padding: 30}} />
                </View>
              );
            }

            var mainStyles = StyleSheet.create({
              container:{
                flex:1
              }
            });
            if (data.search_restaurants && data.search_restaurants.results && data.search_restaurants.results.length > 0) {
              var restaurants = data.search_restaurants.results.filter((elem) => elem.images && elem.images.length > 0);
              return (
                  <View>
                    <View>
                      <Text>Hard 1</Text>
                    </View>
                    <View>
                      <Text>Hard 2</Text>
                    </View>
                  </View>
              );
            }

            // No Data Return
            return (
              <View style={{ width: '100%', paddingVertical: 10 }}>
                <Text>No Results</Text>
              </View>
            );
          }}
        </Query>
      </View>
    );
  }
}

const styles = {
};

