import React, { useState, useEffect } from "react";
import QRScannerTemplate from "../components/templates/TemplatesQRScanner/TemplateQRScanner";
import QRScannerOrganism from "../components/organisms/QRScannerOrganisms/QRScannerOrganism";
import { t, useLanguage } from "../Languages/LanguageHandler"; // Assuming useLanguage is a hook

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
    <QRScannerTemplate
      hasPermission={hasPermission}
      scanned={scanned}
      handleBarCodeScanned={handleBarCodeScanned}
      handleScanAgain={handleScanAgain}
      isActive={isActive}
      currentLanguage={currentLanguage}
      t={t}
      //isLoading={isLoading}
      //itemData={itemData}
      handlePress={handlePress}
    />
  );
};

export default QRScanner;
