import React from "react";
import { Text, View } from "react-native";
import { styles, QRScannerStyles } from "../../../styles/styleSheet";

const HeaderMoleculeQR = ({ title, iconName, onIconPress }) => (
  <View style={styles.header}>
    <Text style={QRScannerStyles.QRScannerHeader} children={title}></Text>
    <TouchableOpacity onPress={onIconPress} style={styles.closeButton}>
      <Icon name={iconName} size={30} style={styles.closeButtonIcon} />
    </TouchableOpacity>
  </View>
);

export default HeaderMoleculeQR;
