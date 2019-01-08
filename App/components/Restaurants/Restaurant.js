import React from 'react';
import {
	View,
	Text,
	ImageBackground,
	TouchableHighlight,
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	Icon, 
	Button,
} from 'react-native-elements';

var screenWidth, screenHeight = Dimensions.get('window');
const Restaurant = (props) => {
	var restaurant = props.restaurant;
	var imageUri = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : "";
	var restaurantType = restaurant.description && restaurant.description.slice(restaurant.description.indexOf(',') + 1).trim() || "Generic cusine";
	return (
		<View style={restaurantStyles.cardView} key="1">
			<View style={restaurantStyles.cardHeader}>
				<Text style={restaurantStyles.cardTitleText}>{restaurantType}</Text>
				<TouchableHighlight style={restaurantStyles.pinRestaurant}>
					<Icon name="pin" type="octicon" color="#56A8FB" />
				</TouchableHighlight>
			</View>
			<View style={restaurantStyles.cardMargin}>

			</View>
			<View style={restaurantStyles.cardBody}>
				<ImageBackground source={{uri:imageUri}} style={{flex: 1}}>
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
	);
}

export default Restaurant;


var restaurantStyles = StyleSheet.create({
	cardView:{
		borderRadius: 21,
		borderWidth: 1,
		width: "98%",
		height: "100%",
		alignSelf: "center"
	},
	cardHeader: {
		width: "100%",
		height: 50,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: "#4285f4"
	},
	cardTitleText: {
		color: "white",
		fontSize: 20,
		padding: 10
	},
	pinRestaurant: {
		borderRadius: 32,
		backgroundColor: 'white',
		position: "absolute",
		top:15,
		right: 15

	},
	cardMargin: {
		backgroundColor: "white",
		width: "100%",
		height: 35
	},
	cardBody: {
		width: "100%",
		height: 250
	},
	RestaurantTitle: {
		backgroundColor: 'rgba(0, 0, 0, .3)',
	},
	restaurantTitleText: {
		color: "white",
		fontSize: 20,
		paddingLeft:10,
		fontFamily:"helvetica",
	},
	cardFooter: {
		width: "100%",
		height: 40,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	}
});