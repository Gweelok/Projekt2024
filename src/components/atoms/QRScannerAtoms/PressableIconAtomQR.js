import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";

const PressableIconAtomQR = ({
  name,
  size,
  touchableStyle,
  iconStyle,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={touchableStyle}>
    <Icon name={name} size={size} style={iconStyle} />
  </TouchableOpacity>
);

export default PressableIconAtomQR;
