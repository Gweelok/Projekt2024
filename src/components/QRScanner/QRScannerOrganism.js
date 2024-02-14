import React from "react";
import { Text, View, SafeAreaView, Pressable } from "react-native";
import { Buttons, styles, QRScannerStyles } from "../../styles/styleSheet";
import ScrollViewComponent from "../atoms/ScrollViewComponent";
import LoadingScreen from "../../screens/LoadingScreen";
import BarCodeScanner from "./BarCodeScanner";
import HeaderQR from "./HeaderQR";

const QRScannerOrganism = ({
  t,
  currentLanguage,
  hasPermission,
  scanned,
  handleBarCodeScanned,
  handleScanAgain,
  handleSaveCode,
  handleIconPress,
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
        <HeaderQR
          title={t("QrScannerScreen.Scan", currentLanguage)}
          iconName="close"
          onIconPress={handleIconPress}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          {t("QrScannerScreen.Header", currentLanguage)}
        </Text>

        <BarCodeScanner
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

                <Pressable
                  onPress={handleScanAgain}
                  disabled={isLoading}
                  style={[
                    Buttons.secondary_button,
                    QRScannerStyles.QRScanAgainButton,
                  ]}
                >
                  <Text style={Buttons.secondary_buttonText}>
                    {t("QrScannerScreen.ScanAgain", currentLanguage)}
                  </Text>
                </Pressable>
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
