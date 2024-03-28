import React from "react";
import { TouchableOpacity, Text } from "react-native";

import whiteColorButton from "./whiteColorButtonStyles";

const WhiteColorButton = ({ onPress, titleText }) => {
  return (
    <TouchableOpacity style={whiteColorButton.button} onPress={onPress}>
      <Text style={whiteColorButton.buttonText}>{titleText}</Text>
    </TouchableOpacity>
  );
};

export default WhiteColorButton;
