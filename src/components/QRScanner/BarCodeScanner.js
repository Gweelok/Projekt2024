import React from "react";
import { Text, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { styles } from "../../styles/styleSheet";
import { t, useLanguage } from "../../Languages/LanguageHandler";

const BarCodeScannerMoleculeQR = ({
  hasPermission,
  handleBarCodeScanned,
  scanned,
}) => (
  <>
    {hasPermission ? (
      <View style={styles.qrScannerFrame}>
        <View style={styles.dashedBorder}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />
        </View>
      </View>
    ) : (
      //The hardcoded text needs to be changed to accomodate multiple languages.
      //<Text style={{ margin: 10 }}>{ t("QrScanner.NoCameraAccess", currentLanguage)}</Text>
      <Text style={{ margin: 10 }}>No access to the camera</Text>
    )}
  </>
);

export default BarCodeScannerMoleculeQR;
