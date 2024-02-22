import React from 'react';
import { View, StyleSheet } from "react-native";
import TextLink from "../molecules/TextLink"; 
import Spacer from "../atoms/Spacer";
import { Entypo } from '@expo/vector-icons';
import { Primarycolor1 } from "../../styles/styleSheet"

const TextLinkList = ({ location, navigation, textValue, linkStatus }) => {
    console.log(textValue);
    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <TextLink status={true} path={"OverView"} location={location} navigation={navigation} textValue={textValue.overview}></TextLink>
                {linkStatus?.overview && <Entypo name="check" size={22} color={Primarycolor1} style={styles.checkbox}/>}
            </View>
            <Spacer height={70}></Spacer>
            {/* Add correct path */}
            <View style={styles.checkboxContainer}>
                <TextLink status={linkStatus.overview} path={"ReportedItems"} location={location} navigation={navigation} textValue={textValue.items}></TextLink>
                {linkStatus.reportedItems && <Entypo name="check" size={22} color={Primarycolor1} style={styles.checkbox}/>}
            </View>
            <Spacer height={70}></Spacer>
            {/* Add linkStatus.reportedItems */}
            <View style={styles.checkboxContainer}>
                <TextLink status={linkStatus?.reportedItems} path={"Uptainer"} location={location} navigation={navigation} textValue={textValue.condition}></TextLink>
                {linkStatus?.reportedItems && <Entypo name="check" size={22} color={Primarycolor1} style={styles.checkbox}/>} 
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "flex-start", // Center align items vertically
        justifyContent: "space-between", // Align items to the start of the container
    },
    checkbox: {
        paddingLeft: 5, // Adjust the marginLeft to position the icon closer to the text
    }
});

export default TextLinkList;

