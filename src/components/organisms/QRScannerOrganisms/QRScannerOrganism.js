import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ButtonMolecule from "../../molecules/QRScannerMolecules/ButtonMoleculeQR";
import PressableIconAtomQR from "../../atoms/QRScannerAtoms/PressableIconAtomQR";
import { Buttons, styles, Primarycolor1 } from "../../../styles/styleSheet";
import TextAtomQR from "../../atoms/QRScannerAtoms/TextAtomQR";

const QRScannerOrganism = ({
  hasPermission,
  scanned,
  handleBarCodeScanned,
  handleScanAgain,
  handleSaveCode,
  handlePress,
  isActive,
  currentLanguage,
  t,
  isLoading,
}) => (
  <SafeAreaView style={styles.container2}>
    <View style={styles.header}>

      <TextAtomQR
        style={styles.headline}
        children={t("QrScannerScreen.Scan", currentLanguage)}
      />

      <PressableIconAtomQR
        name="close"
        size={30}
        onPress={handlePress}
        touchableStyle={styles.closeButton}
        iconStyle={styles.closeButtonIcon}
      />

    </View>

    <View style={styles.content}>

      <TextAtomQR style={styles.instruction}>
        {t("QrScannerScreen.Header", currentLanguage)}
      </TextAtomQR>

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
          <TextAtomQR style={{ margin: 10 }}>No access to the camera</TextAtomQR>
        )}

        <View style={styles.buttonsContainer}>
          {scanned && (
            <View>

              <ButtonMolecule
                onPress={handleSaveCode}
                title={t("QrScannerScreen.SaveCode", currentLanguage)}
                disabled={false}
                buttonStyle={[
                  Buttons.main_button,
                  {
                    borderWidth: 1,
                    width: 220,
                    marginHorizontal: 60,
                  },
                ]}
                textStyle={styles.buttonText}
              />

              <ButtonMolecule
                onPress={handleScanAgain}
                title={t("QrScannerScreen.ScanAgain", currentLanguage)}
                disabled={isLoading}
                buttonStyle={[
                  Buttons.main_button,
                  {
                    backgroundColor: "red",
                    borderWidth: 1,
                    width: 220,
                    marginHorizontal: 60,
                  },
                ]}
                textStyle={styles.buttonText}
              />
            </View>
          )}
        </View>

        <TextAtomQR style={styles.instruction}>
          {t("QrScannerScreen.Bottom", currentLanguage)}
        </TextAtomQR>

      </View>
  </SafeAreaView>
);

export default QRScannerOrganism;
