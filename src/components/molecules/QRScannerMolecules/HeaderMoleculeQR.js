// HeaderMolecule.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { styles } from "../../../styles/styleSheet";

const HeaderMolecule = ({ title, onPressClose, currentLanguage, t }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{t(title, currentLanguage)}</Text>
    <TouchableOpacity style={styles.closeButton} onPress={onPressClose}>
      <Icon name="close" size={30} style={styles.closeButtonIcon} />
    </TouchableOpacity>
  </View>
);

export default HeaderMolecule;
