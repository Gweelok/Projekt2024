import React from "react";
import { View, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import ButtonMolecule from "../../molecules/QRScannerMolecules/ButtonMoleculeQR";
import QRScannerOrganism from "../../organisms/QRScannerOrganisms/QRScannerOrganism";
import { Buttons, styles } from "../../../styles/styleSheet";
import TextAtomQR from "../../atoms/QRScannerAtoms/TextAtomQR";
import LoadingScreen from "../../../components/LoadingScreen";

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
    {isLoading && <LoadingScreen isLoaderShow={isLoading} />}
    <View style={styles.header}>
      <HeaderMolecule
        title="QrScannerScreen.Scan"
        iconName="close"
        onIconPress={handlePress}
        currentLanguage={currentLanguage}
        t={t}
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
          <View style={{ marginBottom: 10 }}>
            <ButtonMolecule
              onPress={handleSaveCode}
              title={t("QrScannerScreen.SaveCode", currentLanguage)}
              disabled={!isActive || isLoading}
              buttonStyle={[
                Buttons.main_button,
                {
                  borderWidth: 1,
                  width: 220,
                  marginHorizontal: 60,
                },
              ]}
              textStyle={Buttons.main_buttonText}
            />

            <ButtonMolecule
              onPress={handleScanAgain}
              title={t("QrScannerScreen.ScanAgain", currentLanguage)}
              disabled={isLoading}
              buttonStyle={[
                Buttons.secondary_button,
                {
                  backgroundColor: "red",
                  borderWidth: 1,
                  width: 220,
                  marginHorizontal: 60,
                },
              ]}
              textStyle={Buttons.secondary_buttonText}
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
