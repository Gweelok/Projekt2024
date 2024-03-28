import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import headerTitleStyles from "./headerTitleStyles";
import indexStyles from "../../styles";

const HeaderTitle = ({
  onLeftIconPress,
  onRightIconPress,
  headerTitle,
  leftIcon,
  rightIcon,
}) => {
  return (
    <View style={headerTitleStyles.container}>
      {leftIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onLeftIconPress}
          style={headerTitleStyles.iconButtonLeft}
        >
          <Ionicons name={leftIcon} style={headerTitleStyles.icon} />
        </TouchableOpacity>
      )}

      <Text style={headerTitleStyles.headerTitleText}>{headerTitle}</Text>

      {rightIcon && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={headerTitleStyles.iconButtonRight}
          onPress={onRightIconPress}
        >
          <Ionicons name={rightIcon} style={headerTitleStyles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({});
