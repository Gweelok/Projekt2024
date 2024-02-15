import { Button, TouchableOpacity, TouchableHighlight, Pressable, View, StyleSheet, ScrollView, Text, RefreshControl } from "react-native"

import { windowHeight, windowWidth } from "../../utils/Dimensions"
import UptainerContent from "../../components/Uptainer/UptainerContent"

import { SharedContext } from '../../context/TaskContext';

import { Primarycolor1, Primarycolor2, styles, Buttons } from "../../styles/styleSheet"
import { useState, useContext } from "react"

const Uptainer = ({route}) => {
    const { location } = route.params;

    return (
        <View 
        style={styleLocal.container}
        >   
            <UptainerContent location={location}></UptainerContent>
            
        </View>
    )
}

const styleLocal = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 100,
        flex: 1,
    }   
})

export default Uptainer