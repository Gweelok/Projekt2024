import React from "react";
import { Text, View, SafeAreaView } from "react-native";
import { Buttons, styles, QRScannerStyles } from "../../../styles/styleSheet";
import ScrollViewComponent from "../../atoms/ScrollViewComponent";
import LoadingScreen from "../../LoadingScreen";
import BarCodeScannerMoleculeQR from "../MoleculesQR/BarCodeScannerMoleculeQR";
import HeaderMoleculeQR from "../MoleculesQR/HeaderMoleculeQR";

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
                
                <Pressable
                  onPress={handleSaveCode}
                  disabled={!isActive || isLoading}
                  style={[Buttons.main_button, QRScannerStyles.QRScanButton]}
                >
                  <Text style={Buttons.main_buttonText}>
                    {t("QrScannerScreen.SaveCode", currentLanguage)}
                  </Text>
                </Pressable>
                {/*                 <PressableAtomQR
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
                /> */}

                <Pressable
                  onPress={handleScanAgain}
                  disabled={isLoading}
                  style={[Buttons.secondary_button, QRScannerStyles.QRScanAgainButton]}
                >
                  <Text style={Buttons.secondary_buttonText}>
                    {t("QrScannerScreen.ScanAgain", currentLanguage)}
                  </Text>
                </Pressable>

                {/*    <PressableAtomQR
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
                /> */}
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
