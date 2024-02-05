import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import {Primarycolor1} from "../../../styles/Stylesheet";

const StationTitle = ({ title, description }) => {
    return (
        <View style={[styles.container]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:-10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color : Primarycolor1,
        fontFamily: 'space-grotesk-bold',
    },
    description: {
        fontSize: 15,
        textAlign: 'center',
        color : Primarycolor1,
        fontFamily: 'space-grotesk',
        marginBottom:20
    },
});

export default StationTitle;
