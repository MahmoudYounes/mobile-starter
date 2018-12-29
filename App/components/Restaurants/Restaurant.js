import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet
} from 'react-native';


const Restaurant = (props) => {
	var restaurant = props.restaurant;
	return (
		<View style={{alignItems: 'center', padding: 20}} key="1">
			<Text style={{color: "black"}}>{restaurant.title}</Text>
		</View>
	);
}

export default Restaurant;