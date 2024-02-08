import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import {
  Buttons,
  Primarycolor1,
  styles,
} from "../styles/styleSheet";
import React, { useState, useContext, useEffect } from "react";
import ScrollViewComponent from "../components/atoms/ScrollViewComponent";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";

const QRScanner = ({ route, navigation }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const itemData = route.params;

  const handlePress = () => {
    console.log("Attempting to go back");
    //navigation.goBack();
    navigation.navigate("Home"); // For testing
  };

  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  //const { isLoading, setIsLoading } = useContext(LoaderContext);

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const scannedQRCode = generateQRCode(data);
    setScannedQRCode(scannedQRCode);
    const scannedQRCodeExist = await QRCodeExists(data);
    setScanned(true);
    if (scannedQRCodeExist === "Draft") {
      setIsActive(false);
      Alert.alert(
        t("QrScannerScreen.QRCodeNotFound1", currentLanguage),
        t("QrScannerScreen.ScanAgain", currentLanguage),
        [
          {
            text: t("QrScannerScreen.OK", currentLanguage),
            onPress: () => {
              //  console.log("Type: " + type + "\nData: " + data);
            },
          },
        ]
      );
    } else {
      //console.log("Type: " + type + "\nData: " + data);
      setIsActive(true);
      setScanned(true);
      setText(data);
    }
  };

 const handleScanAgain = () => {
   setScanned(false);
   setScannedQRCode(null);
 };

  return (
    <ScrollViewComponent>
      <SafeAreaView style={styles.container2}>
        <View style={styles.header}>
          <Text style={AddStyles.header}>
            {t("QrScannerScreen.Scan", currentLanguage)}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handlePress}
            //disabled={isLoading}
          >
            <Icon size={30} name="close" style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.instruction}>
            {t("QrScannerScreen.Header", currentLanguage)}
          </Text>

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
            <Text style={{ margin: 10 }}>No access to the camera</Text>
          )}
          <View style={styles.buttonsContainer}>
            {scanned && (
              <View>
                <View style={{ marginBottom: 10 }}>
                  {isActive ? (
                    <Pressable
                      onPress={handleSaveCode}
                      disabled={isLoading}
                      style={[
                        Buttons.main_button,
                        {
                          borderWidth: 1,
                          width: 220,
                          marginHorizontal: 60,
                        },
                      ]}
                    >
                      <Text style={Buttons.main_buttonText}>
                        {t("QrScannerScreen.SaveCode", currentLanguage)}
                      </Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={handleSaveCode}
                      disabled={isLoading}
                      style={[
                        Buttons.main_button,
                        {
                          backgroundColor: "red",
                          borderWidth: 1,
                          width: 220,
                          marginHorizontal: 60,
                        },
                      ]}
                    >
                      <Text style={Buttons.main_buttonText}>
                        {t("QrScannerScreen.SaveCode", currentLanguage)}
                      </Text>
                    </Pressable>
                  )}
                </View>
                <View>
                  <Pressable
                    onPress={handleScanAgain}
                    disabled={isLoading}
                    style={[
                      Buttons.secondary_button,
                      {
                        borderWidth: 2,
                        width: 220,
                        marginHorizontal: 60,
                      },
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
};
const AddStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 15,
    display: "flex",
  },
  header: {
    fontFamily: "space-grotesk-bold",
    fontSize: 35,
    color: Primarycolor1,
    fontWeight: "bold",
    marginBottom: 20,
  },
  marginView: {
    marginLeft: 8,
    marginRight: 8,
  },
  informativeText: {
    fontSize: 15,
    color: Primarycolor1,
    fontWeight: "500",
  },
});
export default QRScanner;
