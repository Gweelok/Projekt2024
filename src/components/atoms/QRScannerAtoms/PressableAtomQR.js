import React from "react";
import { Pressable, Text } from "react-native";

const PressableAtomQR = ({ onPress, children, style, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
};

export default PressableAtomQR;
