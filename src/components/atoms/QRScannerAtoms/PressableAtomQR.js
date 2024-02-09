import React from "react";
import { Pressable, Text } from "react-native";
import { Buttons } from "../../../styles/styleSheet";

const PressableAtomQR = ({
  onPress,
  buttonStyle,
  textStyle,
  t,
  title,
  currentLanguage,
  disabled,
}) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[Buttons.main_button, buttonStyle]}>
      <Text style={textStyle}>{t(title, currentLanguage)}</Text>
    </Pressable>
    
  );
};

export default PressableAtomQR;
