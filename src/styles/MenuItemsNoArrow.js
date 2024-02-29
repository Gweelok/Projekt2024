import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {styles} from "./styleSheet"

export const MenuItemsNoArrow = ({ msg, onPress, badge }) => {
    return (
        <View>
            <Pressable onPress={onPress}>
                <View style={styles.menuItem}>
                    <View style={styles.menuItemContent}>
                        <Text style={styles.menuItem_text}>{msg}</Text>
                    </View>
                    <View>
                        {badge && badge > 0 && (
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{badge}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Pressable>
        </View>
    );
};
export default MenuItemsNoArrow;
