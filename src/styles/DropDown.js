import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from "./Stylesheet";

export const DropDown = ({ label, onPress }) => {
    return (
        <View style={styles.DropDownContainer}>
            <Pressable onPress={onPress}>
                <View style={styles.categoryDropDown}>
                    <View style={styles.categoryTextContainer}>
                        <Text style={styles.categoryDropDownText}> {label} </Text>
                    </View>
                    <View style={styles.categoryIconContainer}>
                        <AntDesign name="down" size={30} style={styles.categoryDropDownArrow} />
                    </View>
                </View>
            </Pressable>
        </View>
    )
};
