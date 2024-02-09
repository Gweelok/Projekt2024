import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Buttons, styles } from "../../../styles/styleSheet";
import ScrollViewComponent from "../../atoms/ScrollViewComponent";
import LoadingScreen from "../../../components/LoadingScreen";
import BarCodeScannerMoleculeQR from "../../molecules/QRScannerMolecules/BarCodeScannerMoleculeQR";
import HeaderMoleculeQR from "../../molecules/QRScannerMolecules/HeaderMoleculeQR";
import PressableAtomQR from "../../atoms/QRScannerAtoms/PressableAtomQR";

const QRScannerOrganism = ({
  t,
  currentLanguage,
  hasPermission,
  scanned,
  handleBarCodeScanned,
  handleScanAgain,
  handleSaveCode,
  handlePress,
  isActive,
  isLoading,
}) => (
  <ScrollViewComponent>
    <SafeAreaView style={styles.container2}>
      {isLoading && <LoadingScreen isLoaderShow={isLoading} />}

      <View>
        {/*   Right now, the QR scanner is set up only for Adding.
      If Taking will be implemented later, than the title here can be exported as a prop,
      and in the screen level, it can be changed accordingly. */}
        <HeaderMoleculeQR
          title={t("QrScannerScreen.Scan", currentLanguage)}
          iconName="close"
          onIconPress={handlePress}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          {t("QrScannerScreen.Header", currentLanguage)}
        </Text>

        <BarCodeScannerMoleculeQR
          hasPermission={hasPermission}
          handleBarCodeScanned={handleBarCodeScanned}
          currentLanguage={currentLanguage}
          scanned={scanned}
          t={t}
        />

        <View style={styles.buttonsContainer}>
          {scanned && (
            <View>
              <View style={{ marginBottom: 10 }}>
                <PressableAtomQR
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

                <PressableAtomQR
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
            </View>
          )}
        </View>

        <Text style={styles.instruction}>
          {t("QrScannerScreen.Bottom", currentLanguage)}
        </Text>
      </View>
    </SafeAreaView>
  </ScrollViewComponent>
);

export default QRScannerOrganism;
