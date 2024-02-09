import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRScannerOrganism from "../components/organisms/QRScannerOrganisms/QRScannerOrganism";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { LoaderContext } from "../components/LoaderContext";
import { generateQRCode } from "../utils/QRCodeGenerator";
import {
  createItem,
  getUptainerFromQR,
  getUptainerById,
  QRCodeExists,
  updateItemById,
} from "../utils/Repo";

const QRScanner = ({ route, navigation }) => {
  const { currentLanguage } = useLanguage();
  const itemData = route.params;
  const [hasPermission, setHasPermission] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const [text, setText] = useState("");

  const handlePress = () => {
    console.log("Attempting to go back");
    //navigation.goBack();
    navigation.navigate("Home"); // For testing
  };

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

  const handleSaveCode = async () => {
    setIsLoading(true);

    if (scannedQRCode) {
      const qrCodeString = JSON.stringify(scannedQRCode);
      try {
        await AsyncStorage.setItem("scannedQRCode", qrCodeString);
        const scannedQRCodeObject = JSON.parse(qrCodeString);
        const value = scannedQRCodeObject.props.value;
        console.log("value: ", value);
        const itemId = itemData?.itemId;
        const uptainerId = await getUptainerFromQR(value);
        const uptainer = await getUptainerById(uptainerId);

        if (uptainer) {
          setIsActive(true);

          try {
            if (itemId) {
              const updatedData = {
                itemproduct: itemData?.product,
                itemBrand: itemData?.brand,
                itemModel: itemData?.model,
                itemCategory: itemData?.category,
                itemDescription: itemData?.description,
                itemcondition: itemData?.condition,
                itemUptainer: uptainerId,
              };
              await updateItemById(itemId, updatedData, itemData?.image);
            } else {
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
            }
          } catch (error) {
            console.log("can not create item. Error: ", error);
          }

          Alert.alert(
            t("QrScannerScreen.Success", currentLanguage),
            t("QrScannerScreen.QRCodeSavedSuccessfully", currentLanguage),
            [
              {
                text: t("QrScannerScreen.OK", currentLanguage),
                onPress: () => {
                  navigation.navigate("UptainerDetails", {
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
          if (!uptainerId) {
            setIsActive(false);
            console.log("uptainerId before condition:", uptainerId);
            const navDir1 = "MyDrafts";
            console.log("Condition met, navDir set to:", navDir1);

            Alert.alert(
              t("QrScannerScreen.QRCodeNotFound", currentLanguage),
              t("QrScannerScreen.ScanAgain", currentLanguage),
              [
                {
                  text: t("QrScannerScreen.OK", currentLanguage),
                  onPress: () => {
                    navigation.navigate(navDir1, uptainer);
                    setIsLoading(true);
                  },
                },
              ]
            );
          }
        }
      } catch (error) {
        console.error("Error saving scanned QR code:", error);

        Alert.alert(
          t("QrScannerScreen.Error", currentLanguage),
          t("QrScannerScreen.ErrorMsg1", currentLanguage),
          [
            {
              text: t("QrScannerScreen.OK", currentLanguage),
              onPress: () => {
                setIsLoading(false);
              },
            },
          ]
        );
      }
    } else {
      console.warn("No QR code scanned to save.");
      setIsLoading(false);
    }
  };

  return (
    <QRScannerOrganism
      hasPermission={hasPermission}
      scanned={scanned}
      handleBarCodeScanned={handleBarCodeScanned}
      handleSaveCode={handleSaveCode}
      handleScanAgain={handleScanAgain}
      isActive={isActive}
      currentLanguage={currentLanguage}
      t={t}
      isLoading={isLoading}
      handlePress={handlePress}
    />
  );
};

export default QRScanner;
