import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign"; // Replace with the appropriate icon library
import { BarCodeScanner } from "expo-barcode-scanner";
import { generateQRCode } from "../../utils/QRCodeGenerator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateItemToTaken } from "../../utils/Repo/Items";
import {
  getUptainerFromQR,
  getUptainerById,
  QRCodeExists,
} from "../../utils/Repo/Uptainers";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import takeQrStyles from "./takeQrStyles";

import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const QRScanner = ({ route }) => {
  const navigation = useNavigation();
  const itemData = route.params;
  console.log("route.params: ", route.params);

  const { currentLanguage } = useLanguage();
  const [loading, setLoading] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

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
    setScanned(true);
    if (scannedQRCodeExist === "Draft") {
      setIsActive(false);
      Alert.alert(
        t("QRScanner.QRCodeNotFound1", currentLanguage),
        t("QRScanner.ScanAgain", currentLanguage),
        [
          {
            text: t("QRScanner.OK", currentLanguage),
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
  console.log(itemData?.uptainer);
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
        const scannedQRCodeObject = JSON.parse(qrCodeString);
        const value = scannedQRCodeObject.props.value;
        console.log("value: ", value);

        const uptainerId = await getUptainerFromQR(value);
        const uptainer = await getUptainerById(uptainerId);

        if (uptainer) {
          setIsActive(true);
          if (uptainerId === itemData?.uptainer.uptainerId) {
            try {
              const itemId = itemData?.itemId;

              await updateItemToTaken(itemId);
            } catch (error) {
              console.log("can not change item to taken. Error: ", error);
            }
            // Do we really need these alerts, feels like a bit breaking the flow.
            Alert.alert(
              t("QRScanner.Success", currentLanguage),
              t("QRScanner.QRCodeSavedSuccessfully", currentLanguage),
              [
                {
                  text: t("QRScanner.OK", currentLanguage),
                  onPress: () => {
                    navigation.navigate(Screens.INFO_GRAPHIC_CO2, {
                      // I am not sure if we still need to pass the uptainer data and scanned QR code data to the next screen
                      screenFrom: "QRScanner",
                      uptainerData: {
                        id: uptainer.id,
                        name: uptainer.uptainerName,
                        location: uptainer.uptainerStreet, // or uptainer.uptainerCity if appropriate
                        imageUrl: uptainer.imageUrl, // Use appropriate image URL if available
                      },
                      scannedQRCodeData: scannedQRCodeObject.props.value, // Ensure this is defined correctly
                    });
                    setIsLoading(false);
                  },
                },
              ]
            );
          } else {
            Alert.alert(
              "can't take error",
              `uptainer you scanned ${uptainer.uptainerName} isn't the correct one saved as item is saved in ${itemData?.uptainer.uptainerName}`,
              [
                {
                  text: "Okay",
                  onPress: () => {
                    setIsLoading(false);
                  },
                },
              ]
            );
          }
        } else {
          if (!uptainerId) {
            setIsActive(false);
            console.log("uptainerId before condition:", uptainerId);

            Alert.alert(
              t("QRScanner.QRCodeNotFound", currentLanguage),
              t("QRScanner.ScanAgain", currentLanguage),
              [
                {
                  text: t("QRScanner.OK", currentLanguage),
                  onPress: () => {
                    navigation.navigate(Screens.MY_DRAFTS, uptainer);
                  },
                },
              ]
            );
          }
        }
      } catch (error) {
        console.error("Error saving scanned QR code:", error);

        Alert.alert(
          t("QRScanner.Error", currentLanguage),
          t("QRScanner.ErrorMsg1", currentLanguage),
          [
            {
              text: t("QRScanner.OK", currentLanguage),
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
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={takeQrStyles.headerContainer}>
          <Text style={takeQrStyles.headertext}>
            {t("TakeQRScanner.Scan", currentLanguage)}
          </Text>

          <TouchableOpacity
            style={takeQrStyles.closeButton}
            onPress={handlePress}
          >
            <Icon name="close" style={takeQrStyles.closeIcon} />
          </TouchableOpacity>
        </View>

        <Text style={takeQrStyles.subHeading}>
          {t("QRScanner.Header", currentLanguage)}
        </Text>

        {hasPermission ? (
          <View style={takeQrStyles.qrFrame}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={takeQrStyles.barCodeScanner}
            />
          </View>
        ) : (
          <Text style={takeQrStyles.noAccessText}>No access to the camera</Text>
        )}

        <View style={takeQrStyles.buttonContainer}>
          {scanned && (
            <View>
              {isActive ? (
                <Pressable
                  onPress={handleSaveCode}
                  style={takeQrStyles.takeButton}
                >
                  <Text style={takeQrStyles.takeButtonText}>
                    {" "}
                    {t("QRScanner.Take", currentLanguage)}{" "}
                  </Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={handleSaveCode}
                  style={takeQrStyles.takeErrorButton}
                >
                  <Text style={takeQrStyles.takeButtonText}>
                    {" "}
                    {t("QRScanner.SaveCode", currentLanguage)}{" "}
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleScanAgain}
                style={takeQrStyles.scanAgainButton}
              >
                <Text style={takeQrStyles.scanAgainButtonText}>
                  {" "}
                  {t("QRScanner.ScanAgain", currentLanguage)}{" "}
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        <Text style={takeQrStyles.paragraph}>
          {" "}
          {t("QRScanner.Bottom", currentLanguage)}{" "}
        </Text>
      </ScrollViewComponent>
    </InteractiveScreen>
  );
};

export default QRScanner;
