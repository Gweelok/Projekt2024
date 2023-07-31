import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {Primarycolor1} from "../../../styles/Stylesheet";
import {AntDesign} from "@expo/vector-icons";

class CustomCallout extends React.Component {
    render() {
        const {currentLocation} = this.props;

        return (
            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Text style={styles.locationName}>{currentLocation.name}</Text>
                    <Text style={styles.locationAddress}>Address: {currentLocation.address}</Text>
                </View>
                <View style={styles.Icon_container}>
                    <AntDesign style={{justifyContent: 'center'}} name="right" size={26} color={Primarycolor1}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    columnContainer: {
        flexDirection: 'column',
        marginLeft: 8,
        marginBottom: 5,
        marginTop: 5,
        marginRight: 5,
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'space-grotesk-bold',
    },
    locationAddress: {
        marginTop: -5,
        fontSize: 14,
        fontFamily: 'space-grotesk',
    },
});

export default CustomCallout;
