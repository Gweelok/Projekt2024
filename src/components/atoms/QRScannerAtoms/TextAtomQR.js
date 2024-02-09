import React from "react";
import { Text } from "react-native";
import { styles } from "../../../styles/styleSheet";

const TextAtomQR = ({ style, children }) => (
  <Text style={style}>{children}</Text>
);

export default TextAtomQR;