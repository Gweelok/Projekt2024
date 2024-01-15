import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign"; // Replace with the appropriate icon library
import { BarCodeScanner } from "expo-barcode-scanner";
import { generateQRCode } from "../../utils/QRCodeGenerator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buttons, styles } from "../../styles/Stylesheet";
import {
  createItem,
  getUptainerFromQR,
  getUptainerById,
  QRCodeExists,
} from "../../utils/Repo";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";

const QRScanner = ({ route, navigation, uptainerData }) => {
  const itemData = route.params;
  console.log("route.params: ", route.params);

  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);

  const screenNavigation = { screenFrom: "QRScanner" };

  const handlePress = () => {
    navigation.goBack();
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState(); // Initialize scanned text with a default value
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const askForCameraPermission = async () => {
    // Made askForCameraPermission an async function
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
    setScanned(true)
    if (scannedQRCodeExist === "Draft") {
      setIsActive(false);
      Alert.alert(  
        t("QrScannerScreen.QRCodeNotFound", currentLanguage),
        t("QrScannerScreen.ScanAgain", currentLanguage),
        [
          {
            text: t("OK", currentLanguage),
            onPress: () => {
              // console.log("Type: " + type + "\nData: " + data);
              // Optionally, navigate or perform other actions after saving
            },
          },
        ]
      );

    } else {
      console.log("Type: " + type + "\nData: " + data);
      setIsActive(true);
      setScanned(true);
      setText(data);
    }
  };

  const handleScanAgain = () => {  
    setScanned(false);
    // console.log("description: ", itemData?.description);
    //setText('Not yet scanned'); // Reset the scanned text
    setScannedQRCode(null);
  };

  const handleSaveCode = async () => {
    if (scannedQRCode) {
      const qrCodeString = JSON.stringify(scannedQRCode);
      try {
        await AsyncStorage.setItem("scannedQRCode", qrCodeString);
        const scannedQRCodeObject = JSON.parse(qrCodeString);
        // console.log("scannedQRCodeObject: ", scannedQRCodeObject);
        const value = scannedQRCodeObject.props.value;
        console.log("value: ", value);
        let navDir = "UptainerDetails";

        try {
          await createItem(
              itemData?.image,
              itemData?.category,
              itemData?.product,
              itemData?.brand,
              itemData?.model,
              itemData?.condition,
              itemData?.description,
              value // Assuming this is the uptainerQRCode value
          );
        } catch (error) {
          console.log("can not create item. Error: ", error);
        }
        const uptainerId = await getUptainerFromQR(value);
        // Inside handleSaveCode after creating the item and obtaining uptainerId
        const uptainer = await getUptainerById(uptainerId);
        if (uptainer) {
          navigation.navigate('UptainerDetails', {
            screenFrom: 'QRScanner',
            uptainerData: {
              id: uptainer.id,
              name: uptainer.uptainerName,
              location: uptainer.uptainerStreet, // or uptainer.uptainerCity if appropriate
              imageUrl: uptainer.imageUrl, // Use appropriate image URL if available
            },
            scannedQRCodeData: scannedQRCodeObject.props.value, // Ensure this is defined correctly
          });
          Alert.alert(
              t("QrScannerScreen.Success", currentLanguage),
              t("QrScannerScreen.QRCodeSavedSuccessfully", currentLanguage),
              [
                {
                  text: t("QrScannerScreen.OK", currentLanguage),
                  onPress: () => {
                    navigation.navigate(navDir, uptainer);

                    // Optionally, navigate or perform other actions after saving
                  },
                },
              ]
          );
        }


        console.log("uptainerId before condition:", uptainerId);
        let navDir1 = "MyDrafts";
        if (!uptainerId) {

          console.log("Condition met, navDir set to:", navDir1);

        Alert.alert(
          t("QrScannerScreen.Success", currentLanguage),
          t("QrScannerScreen.QRCodeSavedSuccessfully", currentLanguage),
          [
            {
              text: t("QrScannerScreen.OK", currentLanguage),
              onPress: () => {
                 navigation.navigate(navDir1, uptainer);

                // Optionally, navigate or perform other actions after saving
              },
            },
          ]
        );
      }
    }catch (error) {
        console.error("Error saving scanned QR code:", error);

        Alert.alert(
          t("QrScannerScreen.Error", currentLanguage),
          t("QrScannerScreen.ErrorMsg1", currentLanguage),
          [
            {
              text: t("QrScannerScreen.OK", currentLanguage),
              onPress: () => {
                // Optionally, navigate or perform other actions after saving
              },
            },
          ]
        );
      }
    } else {
      console.warn("No QR code scanned to save.");
    }
  };

  const handleQRScan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("UptainerDetails", {
        itemData: "Sample Scanned Data",
      });
    }, 3000);
  };

  return (
    <ScrollViewComponent>
      <SafeAreaView style={styles.container2}>
        <View style={styles.header}>
          <Text style={styles.headline}>
            {t("QrScannerScreen.Scan", currentLanguage)}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handlePress}>
            <Icon size={30} name="close" style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.instruction}>
            {t("QrScannerScreen.Header", currentLanguage)}
          </Text>

          {hasPermission ? (
            <View style={styles.qrScannerFrame} >
              <View style={styles.dashedBorder} >
                <BarCodeScanner
                  onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
                  style={{ flex: 1 }}
                  
                />
              </View >
            </View>
          ) : (
            <Text style={{ margin: 10 }}>No access to the camera</Text>
          )}

          {/*<Text style={styles.maintext}>{text}</Text>*/}

          <View style={styles.buttonsContainer}>
            {scanned && (
              <View>
                <View style={{ marginBottom: 10 }}>
                  {isActive ? (<Pressable
                    onPress={handleSaveCode}
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
                  </Pressable>) : (<Pressable
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

export default QRScanner;
