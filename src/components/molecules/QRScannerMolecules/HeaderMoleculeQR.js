import React from "react";
import { Text, View } from "react-native";
import PressableIconAtomQR from "../../atoms/QRScannerAtoms/PressableIconAtomQR";
import { styles, QRScannerStyles } from "../../../styles/styleSheet";

const HeaderMoleculeQR = ({
  title,
  iconName,
  onIconPress,
}) => (
  <View style={styles.header}>
    <Text
      style={QRScannerStyles.QRScannerHeader}
      children={title}
    >
    </Text>
    <PressableIconAtomQR name={iconName} onPress={onIconPress} />
  </View>
);

export default HeaderMoleculeQR;
