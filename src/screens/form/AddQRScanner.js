import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign"; // Replace with the appropriate icon library
import { BarCodeScanner } from "expo-barcode-scanner";
import { generateQRCode } from "../../utils/QRCodeGenerator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Backgroundstyle, Buttons, styles } from "../../styles/Stylesheet";
import {
  createItem,
  getUptainerFromQR,
  getUptainerById,
  QRCodeExists,
  updateItemById,
} from "../../utils/Repo";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import { LoaderContext } from "../../componets/LoaderContext";
import LoadingScreen from "../../componets/LoadingScreen";
import GlobalStyle from "../../styles/GlobalStyle";


const QRScanner = ({ route, navigation }) => {
  const { currentLanguage } = useLanguage();
  const itemData = route.params;

  const handlePress = () => { navigation.goBack(); };
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);


  const askForCameraPermission = async () => {
    // Made askForCameraPermission an async function
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    // disable auto QR scan handler
    setScanned(true)


    const scannedQRCodeExist = await QRCodeExists(data);


    if (scannedQRCodeExist === "Draft") {
      setScannedQRCode("")
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
      setScannedQRCode(data)
      setIsActive(true);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedQRCode(null);
  };

  const handleSaveCode = async () => {
    setIsLoading(true);


    if (scannedQRCode!=null) {
      try {
        await AsyncStorage.setItem("scannedQRCode", scannedQRCode);
        const itemId = itemData?.itemId
        const uptainerId = await getUptainerFromQR(scannedQRCode);
        const uptainer = uptainerId ? await getUptainerById(uptainerId) : null;

        if (uptainer) {
          if (itemId) {
            // Draft item
            const updatedData = {
              itemproduct: itemData?.product,
              itemBrand: itemData?.brand,
              itemModel: itemData?.model,
              itemCategory: itemData?.category,
              itemDescription: itemData?.description,
              itemcondition: itemData?.condition,
              itemUptainer: uptainerId
            }
            await updateItemById(itemId, updatedData, itemData?.image)
          } else {
            // New item
            await createItem(
              itemData?.image,
              itemData?.category,
              itemData?.product,
              itemData?.brand,
              itemData?.model,
              itemData?.condition,
              itemData?.description,
              scannedQRCode
            );
          }

          setIsLoading(false)
          Alert.alert(
            t("QrScannerScreen.Success", currentLanguage),
            t("QrScannerScreen.QRCodeSavedSuccessfully", currentLanguage),
            [
              {
                text: t("QrScannerScreen.OK", currentLanguage),
                onPress: () => {
                  navigation.navigate('UptainerDetails', {
                    screenFrom: 'QRScanner',
                    uptainerData: {
                      id: uptainer.id,
                      name: uptainer.uptainerName,
                      location: uptainer.uptainerStreet, // or uptainer.uptainerCity if appropriate
                      imageUrl: uptainer.imageUrl, // Use appropriate image URL if available
                    },
                    scannedQRCodeData: scannedQRCode
                  });
                },
              },
            ]
          );

        } else {
          setIsLoading(false);
          Alert.alert(
            t("QrScannerScreen.QRCodeNotFound", currentLanguage),
            t("QrScannerScreen.ScanAgain", currentLanguage),
            [
              {
                text: t("QrScannerScreen.OK", currentLanguage),
                onPress: () => {
                  navigation.navigate("MyDrafts", uptainer);
                },
              },
            ]
          );
        }
      } catch (error) {
        setIsLoading(false);
        Alert.alert(
          t("QrScannerScreen.Error", currentLanguage),
          t("QrScannerScreen.ErrorMsg1", currentLanguage),
          [
            {
              text: t("QrScannerScreen.OK", currentLanguage)
            },
          ]
        );
      }
    } else {
      setIsLoading(false);
      Alert.alert(
        t("QrScannerScreen.QRCodeNotFound1", currentLanguage),
        t("QrScannerScreen.ScanAgain", currentLanguage),
        [
          {
            text: t("QrScannerScreen.OK", currentLanguage)

          },
        ]
      );
    }



  };

  return (
    <ScrollViewComponent style={GlobalStyle.BodyWrapper}>
      <View style={{ marginTop: 40 }}>
        {isLoading && <LoadingScreen isLoaderShow={isLoading} />}

        <View style={styles.header}>
          <Text style={styles.headline}>
            {t("QrScannerScreen.Scan", currentLanguage)}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={handlePress} disabled={isLoading}>
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
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ flex: 1 }}
              />
            </View>
          ) : (
            <Text style={{ margin: 10 }}>No access to the camera</Text>
          )}

          <View style={styles.buttonsContainer}>
            {scannedQRCode != null && (
              <View>
                <View>
                  {isActive ? (<Pressable
                    onPress={handleSaveCode}
                    disabled={isLoading}
                    style={Buttons.main_button}>
                    <Text style={Buttons.main_buttonText}>
                      {t("QrScannerScreen.SaveCode", currentLanguage)}
                    </Text>
                  </Pressable>) :
                    (<Pressable
                      onPress={handleSaveCode}
                      disabled={isLoading}
                      style={[Buttons.main_button, { backgroundColor: "red", borderColor: "red" }]}>
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

      </View>
    </ScrollViewComponent>
  );
};

export default QRScanner;