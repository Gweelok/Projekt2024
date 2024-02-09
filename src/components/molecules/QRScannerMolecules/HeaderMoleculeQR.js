import React from "react";
import { Text, View } from "react-native";
import PressableIconAtomQR from "../../atoms/QRScannerAtoms/PressableIconAtomQR";
import { styles, QRScannerStyles } from "../../../styles/styleSheet";

const HeaderMoleculeQR = ({
  t,
  title,
  currentLanguage,
  iconName,
  onIconPress,
}) => (
  <View style={styles.header}>
    <Text
      style={QRScannerStyles.QRScannerHeader}
      children={t(title, currentLanguage)}
    >
    </Text>
    <PressableIconAtomQR name={iconName} onPress={onIconPress} />
  </View>
);

export default HeaderMoleculeQR;
