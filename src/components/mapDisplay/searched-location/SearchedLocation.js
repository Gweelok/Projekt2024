import React from "react";

import {styles} from "../../../styles/Stylesheet";
import searchedLocationStyles from "./searchedLocationStyles";

import { TouchableOpacity, View, Text } from "react-native";
import { calculateDistance } from "../../../utils/uptainersUtils";

const SearchedLocation = ({location, styling, onPress, userLatitude, userLongitude,}) =>{
    return (
    <TouchableOpacity key={location.uptainerName} onPress={onPress} style={styling}>

        <View style={searchedLocationStyles.stationInfo}>
            <View>
                <Text style={searchedLocationStyles.stationName}>{location.uptainerName}</Text>
                <View style={searchedLocationStyles.addressInfo}>
                    <Text style={[styles.article_text, searchedLocationStyles.stationAddress]}>{`${location.uptainerStreet}, ${location.uptainerCity}`}</Text>
                    <View style={searchedLocationStyles.spacer} />
                    {(userLatitude !== null && userLongitude !== null) &&
                    (<Text style={searchedLocationStyles.distance}>{` ${calculateDistance(
                        {latitude: userLatitude,
                            longitude: userLongitude},
                        {latitude: parseFloat(location.uptainerLatitude),
                            longitude: parseFloat(location.uptainerLongitude)}
                    )} km`}</Text>)}
                </View>
            </View>
        </View>
        
    </TouchableOpacity>)
}

export default SearchedLocation;