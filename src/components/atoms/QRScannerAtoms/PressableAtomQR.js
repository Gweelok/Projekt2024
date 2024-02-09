import React from "react";
import { Pressable, Text } from "react-native";
import { Buttons, styles } from "../../../styles/styleSheet";

const PressableAtomQR = ({ onPress, children, buttonStyle, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={[Buttons.main_button, buttonStyle]}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

export default PressableAtomQR;
