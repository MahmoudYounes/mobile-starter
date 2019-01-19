import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';

import RestaurantSearchResults from './RestaurantSearchResults';

export default class Restaurants extends React.Component {
  state = {
    restaurantAddress: ""
  };

  render() {
    // test address '1260 6th Ave, New York, NY 10020';
    return (
      <View style={mainStyles.container}>
        <View style={{alignSelf:"center"}}>
          <Image source={require('./../../images/FoodsyLogo.png')} ></Image>
        </View>
        <View>
          <TextInput
            onChangeText={(userInput) => this.setState({restaurantAddress: userInput})}
          >
          </TextInput>
        </View>
        <RestaurantSearchResults restaurantAddress={this.state.restaurantAddress}/>
      </View>
    );
  }
}

const mainStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#cce6ff"
  }
});