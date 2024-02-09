import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { styles } from "../../../styles/styleSheet";

const PressableIconAtomQR = ({ name, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.closeButton}>
    <Icon name={name} size={30} style={styles.closeButtonIcon} />
  </TouchableOpacity>
);

export default PressableIconAtomQR;
