import React from "react";
import {View, Text } from "react-native";

import customCallOutStyles from "./customCallOutStyles";
import {Primarycolor1} from "../../../styles/Stylesheet";

import {AntDesign} from "@expo/vector-icons";

class CustomCallout extends React.Component {
    render() {
        const {currentLocation} = this.props;

        return (
            <View style={customCallOutStyles.rowContainer}>
                <View style={customCallOutStyles.columnContainer}>
                    <Text style={customCallOutStyles.locationName}>{currentLocation.uptainerName}</Text>
                    <Text style={customCallOutStyles.locationAddress}>{currentLocation.uptainerStreet}</Text>
                </View>
                <View style={customCallOutStyles.Icon_container}>
                    <AntDesign style={{justifyContent: 'center'}} name="right" size={26} color={Primarycolor1}/>
                </View>
            </View>
        );
    }
}

export default CustomCallout;
