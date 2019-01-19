import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

import { Query } from 'react-apollo';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';

import RestaurantViewPager from './RestaurantViewPager';

const RestaurantSearchResults = function (props) {

    return (
        <Query
            query={RESTAURANT_SEARCH_QUERY}
            variables={{
                address: props.restaurantAddress
            }}>

            {({ loading, error, data = {} }) => {
                if (loading) {
                    return (
                        <View style={styles.loadingActivity}>
                            <Text style={styles.loadingText}>Loading...</Text>
                            <ActivityIndicator size="large" style={styles.loadingActivityIndicator} />
                        </View>
                    );
                }

                if (data.search_restaurants && data.search_restaurants.results && data.search_restaurants.results.length > 0) {
                    var restaurants = data.search_restaurants.results.filter((elem) => elem.images && elem.images.length > 0);
                    return (
                        <RestaurantViewPager restaurants={restaurants}></RestaurantViewPager>
                    );
                }
                // No Data Return
                return (
                    <View style={styles.errorNoDate}>
                        <Text>No Results</Text>
                    </View>
                );
            }}
        </Query>
    )
}

export default RestaurantSearchResults;

var styles = StyleSheet.create({
    loadingActivity:{ 
        width: '100%', 
        paddingVertical: 10, 
        alignContent: "center" 
    },
    loadingText:{
        alignSelf: "center" 
    },
    loadingActivityIndicator: {
        padding: 30 
    },
    errorNoDate:{
        width: '100%', 
        paddingVertical: 10 
    }
});