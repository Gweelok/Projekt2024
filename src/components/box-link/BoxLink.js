import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import boxlinkStyles from "./boxlinkStyles";

export const BoxLink = ({ msg, onPress }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View style={boxlinkStyles.boxLinkContainer}>
          <View style={boxlinkStyles.wrapper}>
            <Text style={boxlinkStyles.menuItem_text}>{msg} </Text>
          </View>
          <View style={boxlinkStyles.iconContainer}>
            <AntDesign name="right" size={30} style={boxlinkStyles.arrowIcon} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
