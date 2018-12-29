import React from 'react';
import {
	View,
	Text
} from 'react-native';
import createStackNavigator from 'react-navigation';

import Restaurant from './Restaurant'

const RestaurantsList = (props) =>
{
	return (
	<View>
		<Restaurant restaurant={props.restaurants[0]} />
	</View>
	);
}

export default RestaurantsList;