import React from "react";
import { View, Text } from "react-native";
import PressableIconAtomQR from "../../atoms/QRScannerAtoms/PressableIconAtomQR";
import { styles } from "../../../styles/styleSheet";

const HeaderMolecule = ({ title, onPressClose, currentLanguage, t }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{t(title, currentLanguage)}</Text>
    <PressableIconAtomQR
      name="close"
      size={30}
      onPress={onPressClose}
      touchableStyle={styles.closeButton}
      iconStyle={styles.closeButtonIcon}
    />
  </View>
);

export default HeaderMolecule;
