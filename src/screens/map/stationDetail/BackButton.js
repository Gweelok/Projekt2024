import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import {Primarycolor1} from "../../../styles/Stylesheet"; // 这里你可以选择你喜欢的图标库

const BackButton = ({ navigation }) => {
    return (
        <TouchableOpacity style={[styles.container]} onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Primarycolor1,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BackButton;
