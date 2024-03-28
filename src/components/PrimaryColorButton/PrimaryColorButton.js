import React from "react";
import { TouchableOpacity, Text } from "react-native";
import primaryColorButton from "./primaryColorButtonStyles";

const PrimaryColorButton = ({ onPress, titleText }) => {
  return (
    <TouchableOpacity style={primaryColorButton.button} onPress={onPress}>
      <Text style={primaryColorButton.buttonText}>{titleText}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryColorButton;
