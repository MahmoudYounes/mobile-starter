import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	TouchableHighlight,
	StyleSheet
} from 'react-native';
import {
	Icon, Button
} from 'react-native-elements';

var restaurantStyles = StyleSheet.create({
	cardView:{
		borderRadius: 21,
		borderWidth: 1,
		flex:1,
		backgroundColor: "white"
	},
	cardTitle: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor:"#56A8FB",		
		padding:10, 
		flex: 1,
		flexDirection: "row"
	},
	cardTitleText: {
		color: "white",
		fontSize: 20,
	},
	backgroundImageStyle: {
		width:"100%", 
		height:"80%",
		marginTop: 40,
	},
	RestaurantTitle: {
		flex: 1, 
		flexDirection: "row", 
		alignItems: "flex-start",
		padding: 10,
		backgroundColor: 'rgba(0, 0, 0, .3)',
	},
	restaurantTitleText: {
		color: "white",
		fontSize: 20,
		paddingLeft:10,
		fontFamily:"helvetica",
	}
});

const Restaurant = (props) => {
	var restaurant = props.restaurant;
	var imageUri = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : "";
	var restaurantType = restaurant.description && restaurant.description.slice(restaurant.description.indexOf(',') + 1).trim() || "Generic cusine";
	return (
		<View style={restaurantStyles.cardView} key="1">
			<View style={restaurantStyles.cardTitle}>
				<Text style={restaurantStyles.cardTitleText}>{restaurantType}</Text>
				<TouchableHighlight 
					style={{
						marginLeft:"auto",
						borderRadius: 32,
						backgroundColor: 'white'
					}}>
					<Icon name="pin" type="octicon" color="#56A8FB" />
				</TouchableHighlight>
			</View>
			<ImageBackground source={{uri:imageUri}} style={restaurantStyles.backgroundImageStyle}>
				<View style={restaurantStyles.RestaurantTitle}>
					<Icon name="location-pin" color="#fff" type="simple-line-icon" />
					<Text style={restaurantStyles.restaurantTitleText}>
					{restaurant.title}
					</Text>
				</View>
			</ImageBackground>
		</View>
	);
}

export default Restaurant;