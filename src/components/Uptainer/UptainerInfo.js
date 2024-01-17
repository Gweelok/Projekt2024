import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Primarycolor1, styles, } from "../../styles/styleSheet";

const UptainerInfo = ({ location }) => {   
    return (

        <View style={styles1.stationInfo}>
            <View>
                <Text style={styles1.stationName}>{location.uptainerName}</Text>
                <View style={styles1.addressInfo}>
                    <Text style={[styles.article_text, styles1.stationAddress]}>
                        {`${location.uptainerStreet}, ${location.uptainerCity}`}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles1 = StyleSheet.create({
    stationInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stationName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
        color: Primarycolor1,
    },
    addressInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stationAddress: {
        fontSize: 12,
        color: Primarycolor1,
        width: "75%"
    },
    distance: {
        width: "25%",
        fontSize: 12,
        color: Primarycolor1,
        alignItems: "center"
    },
});

export default UptainerInfo;