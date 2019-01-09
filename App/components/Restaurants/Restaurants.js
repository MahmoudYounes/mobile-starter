import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ViewPagerAndroid,
  ImageBackground,
	TouchableHighlight,
} from 'react-native';
import {
	Icon,
} from 'react-native-elements';

import { Query } from 'react-apollo';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';
//import Restaurant from './Restaurant';

export default class Restaurants extends React.Component {
  state = {
  };

  render() {
    // TODO: This shouldn't be hard coded.  Allow the user to enter it into a Text Input
    const address = '1260 6th Ave, New York, NY 10020';
    return (
      <View style={{flex: 1}}>
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

            if (data.search_restaurants && data.search_restaurants.results && data.search_restaurants.results.length > 0) {
              return (
                  <ViewPagerAndroid style={mainStyles.container}>
                    {
                      data.search_restaurants.results.filter((elem) => elem.images && elem.images.length > 0)
                      .map((restaurant, idx) => {
                        var imageUri = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : "";
                        var restaurantType = restaurant.description && restaurant.description.slice(restaurant.description.indexOf(',') + 1).trim() || "Generic cusine";
                        return (
                          <View style={{flex:1}} key={idx}>
                            <View style={restaurantStyles.cardHeader}>
                              <Text style={restaurantStyles.cardTitleText}>{restaurantType}</Text>
                              <TouchableHighlight style={restaurantStyles.pinRestaurant}>
                              <Icon name="pin" type="octicon" color="#56A8FB" />
                              </TouchableHighlight>
                            </View>
                            <View style={restaurantStyles.cardInfo}>
                                <Text>how long</Text>
                            </View>
                            <View style={restaurantStyles.cardBody}>
                                <ImageBackground source={{uri:imageUri}} style={restaurantStyles.backgroundImage}>
                                <View style={restaurantStyles.RestaurantTitle}>
                                    <Icon name="location-pin" color="#fff" type="simple-line-icon" />
                                    <Text style={restaurantStyles.restaurantTitleText}>
                                    {restaurant.title}
                                    </Text>
                                </View>
                                </ImageBackground>
                            </View>
                            <View style={restaurantStyles.cardFooter}>
                                <Text>this is the footer</Text>
                            </View>                            
                          </View>
                        )
                      })
                    }
                  </ViewPagerAndroid> 
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

const mainStyles = StyleSheet.create({
  container:{
    flex: 1,
  }
});
var restaurantStyles = StyleSheet.create({
	cardView:{
    borderRadius: 21,
		borderWidth: 1,
		flex: 1,
	},
	cardHeader: {
    flex: 1,
		//flexDirection: "row",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#4285f4"
  },
  cardTitleText: {
		color: "white",
		fontSize: 20,
  },
  pinRestaurant: {
		borderRadius: 32,
		backgroundColor: 'white',
		position: "absolute",
		top:15,
		right: 15,
	},
	cardInfo: {
		backgroundColor: "white",
		flex: 1,
	},
	cardBody: {
		flex: 7,
  },
  backgroundImage: {
		flex: 1
  },
  RestaurantTitle: {
		backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  restaurantTitleText: {
		color: "white",
		fontSize: 20,
		fontFamily:"helvetica",
	},
	cardFooter: {
		backgroundColor: "black",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		flex:1,
		backgroundColor: "black"
	}
});