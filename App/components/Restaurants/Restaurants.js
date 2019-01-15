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
      <View style={mainStyles.container}>
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
                  <ViewPagerAndroid style={{flex: 1}}>
                    {
                      data.search_restaurants.results.filter((elem) => elem.images && elem.images.length > 0)
                      .map((restaurant, idx) => {
                        var imageUri = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : "";
                        var restaurantType = restaurant.description && restaurant.description.slice(restaurant.description.indexOf(',') + 1).trim() || "American Standard Cusine";
                        console.log(restaurant);
                        return (
                          <View style={mainStyles.restaurantPage} key={idx}>
                            <View style={restaurantStyles.cardView}>
                              <View style={restaurantStyles.cardHeader}>
                                <Text style={restaurantStyles.cardTitleText}>{restaurantType}</Text>
                                <TouchableHighlight style={restaurantStyles.pinRestaurant}>
                                <Icon name="pin" type="octicon" color="#56A8FB" />
                                </TouchableHighlight>
                              </View>
                              <View style={restaurantStyles.cardInfo}>
                                  <View style={restaurantStyles.cardInfoItem}>
                                    <Icon name="stars" type="materialicon" color="#4285f4"/>
                                    <Text style={{color: "#001f4d", paddingTop:1}}>{restaurant.rating}</Text>
                                  </View>
                                  <View style={restaurantStyles.cardInfoItem}>
                                    <Icon name="drive-eta" type="materialicon" color="#4285f4"/>
                                    <Text style={{color: "#001f4d", paddingTop:1}}>{parseInt(restaurant.distance) + 1} km</Text>
                                  </View>
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
                                  <Text>Call</Text>
                                  <Text>How Far Away</Text>
                                  <Text>Save</Text>
                              </View>                           
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
    padding: 30,
    paddingTop: 40,
    backgroundColor: "#cce6ff"
  },
  restaurantPage: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 21,
		borderWidth: 0,
    flex: 1,
  }
});

var restaurantStyles = StyleSheet.create({
	cardView:{
    flex: 1,
	},
	cardHeader: {
    flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#4285f4"
  },
  cardTitleText: {
		color: "white",
    fontSize: 18,
    alignSelf: "stretch",
    padding: 5
  },
  pinRestaurant: {
		borderRadius: 32,
		backgroundColor: 'white',
		position: "absolute",
		top:15,
		right: 15,
	},
	cardInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "space-around",
  },
  cardInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignSelf:"center",
  },
	cardBody: {
		flex: 7,
  },
  backgroundImage: {
		flex: 1
  },
  RestaurantTitle: {
    backgroundColor: 'rgba(0, 0, 0, .3)',
    flexDirection: "row",
    alignContent: "space-between",
    padding: 10
  },
  restaurantTitleText: {
		color: "white",
		fontSize: 20,
		fontFamily:"helvetica",
	},
	cardFooter: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5
	}
});