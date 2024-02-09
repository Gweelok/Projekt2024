import React from "react";
import { View } from "react-native";
import TextAtomQR from "../../atoms/QRScannerAtoms/TextAtomQR";
import PressableIconAtomQR from "../../atoms/QRScannerAtoms/PressableIconAtomQR";
import { styles } from "../../../styles/styleSheet";

const HeaderMoleculeQR = ({
  t,
  title,
  currentLanguage,
  iconName,
  onIconPress,
}) => (
  <View style={styles.header}>
    <TextAtomQR style={styles.headline} children={t(title, currentLanguage)} />
    <PressableIconAtomQR name={iconName} onPress={onIconPress} />
  </View>
);

export default HeaderMoleculeQR;
