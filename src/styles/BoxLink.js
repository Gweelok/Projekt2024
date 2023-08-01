import React from 'react';
import { View, Text, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {
    styles,
  } from "./Stylesheet";
export const BoxLink = ({msg , onPress}) => {
    return (
    <View>
        <Pressable onPress={onPress}>
    <View style={styles.boxlink}>
        <View style={styles.boxlinkContainer}>
        <Text style={styles.menuItem_text}> {msg}  </Text>
        </View>
            <View style={styles.Icon_container}>
                <AntDesign name="right" size={30} style={styles.menuItem_arrow}/>
            </View>
            </View>
            </Pressable>
    </View>
    )
};