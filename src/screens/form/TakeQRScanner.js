import React, { useState, useEffect, useContext } from "react";
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
  updateItemToTaken,
} from "../../utils/Repo";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import { LoaderContext } from "../../componets/LoaderContext";
import GlobalStyle from "../../styles/GlobalStyle";
import Screens from "../../utils/ScreenPaths";

const QRScanner = ({ route, navigation, uptainerData }) => {
  const itemData = route.params;
  console.log("route.params: ", route.params);

  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
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
      console.log("Type: " + type + "\nData: " + data);
      setIsActive(true);
      setScanned(true);
      setText(data);
    }
  };
  console.log(itemData?.uptainer)
  const handleScanAgain = () => {
    setScanned(false);
    // console.log("description: ", itemData?.description);
    //setText('Not yet scanned'); // Reset the scanned text
    setScannedQRCode(null);
  };

  const handleSaveCode = async () => {
    setIsLoading(true);
    if (scannedQRCode) {
      const qrCodeString = JSON.stringify(scannedQRCode);
      try {
        await AsyncStorage.setItem("scannedQRCode", qrCodeString);
        const scannedQRCodeObject = JSON.parse(qrCodeString);;
        const value = scannedQRCodeObject.props.value;
        console.log("value: ", value);

        const uptainerId = await getUptainerFromQR(value);
        const uptainer = await getUptainerById(uptainerId);

        if (uptainer) {
          setIsActive(true);
          if(uptainerId === itemData?.uptainer.uptainerId){

            try {
              const itemId = itemData?.itemId
              
              await updateItemToTaken(itemId)
            } catch (error) {
              console.log("can not change item to taken. Error: ", error);
            }
            
            Alert.alert(
            t("QrScannerScreen.Success", currentLanguage),
            t("QrScannerScreen.QRCodeSavedSuccessfully", currentLanguage),
            [
              {
                text: t("QrScannerScreen.OK", currentLanguage),
                onPress: () => {
                  navigation.navigate(Screens.UPTAINER_DETAILS, {
                    screenFrom: 'QRScanner',
                    uptainerData: {
                      id: uptainer.id,
                      name: uptainer.uptainerName,
                      location: uptainer.uptainerStreet, // or uptainer.uptainerCity if appropriate
                      imageUrl: uptainer.imageUrl, // Use appropriate image URL if available
                    },
                    scannedQRCodeData: scannedQRCodeObject.props.value, // Ensure this is defined correctly
                  });
                  setIsLoading(false)
                },
              },
            ]
            );
          } else{
            Alert.alert(
              "can't take error",
              `uptainer you scanned ${uptainer.uptainerName} isn't the correct one saved as item is saved in ${itemData?.uptainer.uptainerName}`,
              [{
                text: 'Okay',
                onPress: ()=>{
                  setIsLoading(false)
                }
              }]
            )
          }
        }

        else {

          if (!uptainerId) {
            setIsActive(false);
            console.log("uptainerId before condition:", uptainerId);

            Alert.alert(
                t("QrScannerScreen.QRCodeNotFound", currentLanguage),
                t("QrScannerScreen.ScanAgain", currentLanguage),
                [
                  {
                    text: t("QrScannerScreen.OK", currentLanguage),
                    onPress: () => {
                      navigation.navigate(Screens.MY_DRAFTS, uptainer);
                    },
                  },
                ]
            );
          }
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
      navigation.navigate(Screens.UPTAINER_DETAILS, {
        itemData: "Sample Scanned Data",
      });
    }, 3000);
  };

  return (
    <ScrollViewComponent style={ GlobalStyle.BodyWrapper }>
      <SafeAreaView style={{marginTop: 40}}>
        <View style={styles.header}>
          <Text style={styles.headline}>
            {t("QrScannerScreen.Scan", currentLanguage)}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handlePress}>
            <Icon size={30} name="close" style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.paragraph_text}>
            {t("QrScannerScreen.Header", currentLanguage)}
          </Text>

          {hasPermission ? (
            <View style={styles.qrScannerFrame} >
                <BarCodeScanner
                  onBarCodeScanned={ scanned ? undefined : handleBarCodeScanned}
                  style={{ flex: 1 }}

                />
            </View>
          ) : (
            <Text style={{ margin: 10 }}>No access to the camera</Text>
          )}

          {/*<Text style={styles.maintext}>{text}</Text>*/}

          <View style={styles.buttonsContainer}>
            {scanned && (
              <View>
                <View>
                  {isActive ? (<Pressable
                    onPress={handleSaveCode}
                    style={Buttons.main_button}>
                    <Text style={Buttons.main_buttonText}>
                      {t("QrScannerScreen.Take", currentLanguage)}
                    </Text>
                  </Pressable>) : (<Pressable
                          onPress={handleSaveCode}
                    style={[Buttons.main_button, {backgroundColor: "red", borderColor: "red"}]}>
                    <Text style={Buttons.main_buttonText}>
                      {t("QrScannerScreen.SaveCode", currentLanguage)}
                    </Text>
                  </Pressable>
                  )}
                </View>
                <View>
                <Pressable
                    onPress={handleScanAgain}
                    style={Buttons.secondary_button}>
                    <Text style={Buttons.secondary_buttonText}>
                      {t("QrScannerScreen.ScanAgain", currentLanguage)}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.paragraph_text}>
            {t("QrScannerScreen.Bottom", currentLanguage)}
          </Text>
        </View>
      </SafeAreaView>
    </ScrollViewComponent>
  );
};

export default QRScanner;
