import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPagerAndroid,
    ImageBackground,
    TouchableHighlight,
    Linking
} from 'react-native';
import {
    Icon,
} from 'react-native-elements';


export default class RestaurantViewPager extends React.Component {

    callRestaurant(phoneNumber) {
        if (phoneNumber && !isNaN(phoneNumber)) {
            let link = `tel:${phoneNumber}`;
            Linking.canOpenURL(link).then(supported => {
                if (!supported) {
                    console.log("this url structure is not supported");
                }
                else {
                    return Linking.openURL(link);
                }
            }).catch(err => {
                console.error(err);
            })
        }
    }

    render() {
        return (
            <ViewPagerAndroid peekEnabled={true} pageMargin={20} style={{ flex: 1 }}>
                {
                    this.props.restaurants
                        .map((restaurant, idx) => {
                            var imageUri = restaurant.images && restaurant.images.length > 0 ? restaurant.images[0] : "";
                            var restaurantType = restaurant.description && restaurant.description.slice(restaurant.description.indexOf(',') + 1).trim() || "American Standard Cusine";
                            return (
                                <View style={restaurantStyles.restaurantPage} key={idx}>
                                    <View style={restaurantStyles.cardView}>
                                        <View style={restaurantStyles.cardHeader}>
                                            <Text style={restaurantStyles.cardTitleText}>{restaurantType}</Text>
                                            <TouchableHighlight style={restaurantStyles.pinRestaurant}>
                                                <Icon name="pin" type="octicon" color="#56A8FB" />
                                            </TouchableHighlight>
                                        </View>
                                        <View style={restaurantStyles.cardInfo}>
                                            <View style={restaurantStyles.cardInfoItem}>
                                                <Icon name="stars" type="materialicon" color="#4285f4" />
                                                <Text style={restaurantStyles.cardInfoText}>{restaurant.rating}</Text>
                                            </View>
                                            <View style={restaurantStyles.cardInfoItem}>
                                                <Icon name="drive-eta" type="materialicon" color="#4285f4" />
                                                <Text style={restaurantStyles.cardInfoText}>{parseInt(restaurant.distance) + 1} km</Text>
                                            </View>
                                            <View style={restaurantStyles.cardInfoItem}>
                                                <Icon name="drive-eta" type="materialicon" color="#4285f4" />
                                                <Text style={restaurantStyles.cardInfoText}>{parseInt(restaurant.distance) + 1} km</Text>
                                            </View>
                                        </View>
                                        <View style={restaurantStyles.cardBody}>
                                            <ImageBackground source={{ uri: imageUri }} style={restaurantStyles.backgroundImage}>
                                                <View style={restaurantStyles.RestaurantTitle}>
                                                    <Icon name="location-pin" color="#fff" type="simple-line-icon" />
                                                    <Text style={restaurantStyles.restaurantTitleText}>
                                                        {decodeURIComponent(restaurant.title)}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                        <View style={restaurantStyles.cardFooter}>
                                            <TouchableHighlight underlayColor="white" onPress={() => this.callRestaurant(restaurant.phone)}>
                                                <Text style={restaurantStyles.buttonText}>Call</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight>
                                                <Text style={restaurantStyles.buttonText}>Directions</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight>
                                                <Text style={restaurantStyles.buttonText}>Share</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                }
            </ViewPagerAndroid >
        );
    }
}

var restaurantStyles = StyleSheet.create({
    restaurantPage: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 21,
        borderWidth: 0,
        flex: 1,
    },
    cardView: {
        flex: 1,
    },
    cardHeader: {
        flex: 1,
        flexDirection: "row",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#4285f4",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 5
    },
    cardTitleText: {
        color: "white",
        fontSize: 18,
        flex: 0.75
    },
    pinRestaurant: {
        borderRadius: 32,
        backgroundColor: 'white',
    },
    cardInfo: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 5,
        paddingLeft: 5
    },
    cardInfoItem: {
        flexDirection: "row",
    },
    cardInfoText: {
        color: "#001f4d",
        paddingTop: 1
    },
    cardBody: {
        flex: 7,
    },
    backgroundImage: {
        flex: 1
    },
    RestaurantTitle: {
        backgroundColor: 'rgba(0, 0, 0, .4)',
        flexDirection: "row",
        alignContent: "space-between",
        padding: 10
    },
    restaurantTitleText: {
        color: "white",
        fontSize: 20,
        fontFamily: "helvetica",
    },
    cardFooter: {
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5
    },
    buttonText: {
        color: "#001f4d"
    }
});


