import React from "react";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import backButtonStyles from "./backButtonStyles";

const BackButton = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[backButtonStyles.backButton, style]}
    >
      <Octicons
        name="chevron-left"
        size={backButtonStyles.icon.size}
        style={{ color: backButtonStyles.icon.color }}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
