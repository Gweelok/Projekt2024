import React from 'react';
import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; // Replace with the appropriate icon library
import {
    styles,
  } from "./Stylesheet";
export const BoxLink = ({msg}) => {
    return (
    <View style={styles.boxlink}>
        <Text style={styles.menuItem_text}> {msg}  </Text>
            <View style={styles.Icon_container}>
                <Icon name="right" size={30} style={styles.menuItem_arrow}/>
            </View>
    </View>
    )
};