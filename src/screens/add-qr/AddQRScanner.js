import React, { useState, useEffect, useContext } from "react";
import { Text, View, TouchableOpacity, Alert, Pressable } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign"; // Replace with the appropriate icon library
import { BarCodeScanner } from "expo-barcode-scanner";
import { updateItemById, createItemDraft } from "../../utils/Repo/Items";
import { getUptainerFromQR, QRCodeExists } from "../../utils/Repo/Uptainers";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";

import addQrStyles from "./addQrStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";
import { Permissions } from "../../utils/Permissions";
import Screens from "../../utils/ScreenPaths";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getImage } from "../../utils/Repo/Images";
import { useNavigation } from "@react-navigation/native";

const QRScanner = ({ route }) => {
  const itemData = route.params;

  const navigation = useNavigation()
  const { badgeCount, setBadgeCount } = useContext(BadgeContext);
  const { currentLanguage } = useLanguage();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    Permissions.getCamera()
      .then((loc) => {
        setHasPermission(true);
      })
      .catch(() => {
        Alert.alert("Error", t("LocationPermission.error", currentLanguage));
      });
  }, []);

  alertAddToDraft = () => {
    Alert.alert(
      t("QRScanner.Error", currentLanguage),
      t("QRScanner.QRCodeNotFound", currentLanguage),
      [
        {
          text: t("QRScanner.OK", currentLanguage),
          onPress: () => {
            addToDraft();
          },
        },
      ]
    );
  };

  addToDraft = async () => {
    setIsLoading(true);

    // check if passed item already in draft
    if (itemData.itemUptainer == "Draft") {
      // update draft item
      await updateItemById(itemData.itemId, itemData, itemData.image);

      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: Screens.MY_DRAFTS }, { name: Screens.PRODUCT_SAVED }],
      });
    } else {
      // add to draft
      const response = await createItemDraft(
        itemData.itemproduct,
        itemData.itemBrand,
        itemData.itemModel,
        itemData.itemCategory,
        itemData.image,
        itemData.itemDescription,
        itemData.itemcondition
      );

      setIsLoading(false);

      if (response.draftAdded) {
        navigation.reset({
          index: 0,
          routes: [
            { name: Screens.MY_DRAFTS },
            { name: Screens.PRODUCT_SAVED },
          ],
        });
        setBadgeCount((prevCount) => prevCount + 1);
      } else {
        Alert.alert(
          t("QRScanner.Error", currentLanguage),
          t("UpdroppForm.maxDraft", currentLanguage)
        );
      }
    }
  };

  const handleBarCodeScanned = async ({ type, data }) => {
    // disable auto QR scan handler
    setScanned(true);
    const scannedQRCodeExist = await QRCodeExists(data);

    if (scannedQRCodeExist === "Draft") {
      setScannedQRCode("");
      setIsActive(false);
      Alert.alert(
        t("QRScanner.Error", currentLanguage),
        t("QRScanner.QRCodeNotFound1", currentLanguage)
      );
    } else {
      setScannedQRCode(data);
      setIsActive(true);
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedQRCode(null);
  };

  const handleSaveCode = async () => {
    setIsLoading(true);

    try {
      if (scannedQRCode) {
        const uptainerId = await getUptainerFromQR(scannedQRCode);

        // set image URL to use it later when rendering new item in items list
        // get image from previous screen, can be null or URL or image type
        const imageUrl =
          itemData.image?.uri ||
          itemData.image ||
          (await getImage("Items/Default.jpg"));

        navigation.reset({
          index: 0,
          routes: [
            { name: Screens.MAP },
            {
              name: Screens.UPTAINER_DETAILS,
              params: {
                uptainer: { uptainerId: uptainerId },
                newItem: {
                  ...itemData,
                  imageUrl: imageUrl,
                },
                scannedQRCode: scannedQRCode,
              },
            },
          ],
        });
      } else {
        setIsLoading(false);
        alertAddToDraft();
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        t("QRScanner.Error", currentLanguage),
        t("QRScanner.ErrorMsg1", currentLanguage)
      );
    }
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={addQrStyles.topSpacer}>
          <View style={addQrStyles.header}>
            <Text style={addQrStyles.headline}>
              {t("AddQRScanner.Scan", currentLanguage)}
            </Text>

            <TouchableOpacity
              style={addQrStyles.closeButton}
              onPress={() => {
                navigation.goBack();
              }}
              disabled={isLoading}
            >
              <Icon
                size={30}
                name="close"
                style={addQrStyles.closeButtonIcon}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={addQrStyles.paragraph}>
              {t("QRScanner.Header", currentLanguage)}
            </Text>

            {hasPermission ? (
              <View style={addQrStyles.qrScannerFrame}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={addQrStyles.barCode}
                />
              </View>
            ) : (
              <Text style={addQrStyles.noAccess}>No access to the camera</Text>
            )}

            <View style={addQrStyles.buttonsContainer}>
              {scannedQRCode != null && (
                <View>
                  <View>
                    <Pressable
                      onPress={handleSaveCode}
                      disabled={isLoading}
                      style={[
                        addQrStyles.updroppButton,
                        !isActive && addQrStyles.errorButton,
                      ]}
                    >
                      <Text style={addQrStyles.updroppButtonText}>
                        {t("QRScanner.SaveCode", currentLanguage)}
                      </Text>
                    </Pressable>
                  </View>

                  <View>
                    <Pressable
                      onPress={handleScanAgain}
                      disabled={isLoading}
                      style={addQrStyles.scanAgainButton}
                    >
                      <Text style={addQrStyles.scanAgainButtonText}>
                        {t("QRScanner.ScanAgain", currentLanguage)}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>

            <Text style={addQrStyles.paragraph}>
              {t("QRScanner.Bottom", currentLanguage)}
            </Text>
          </View>
        </View>
      </ScrollViewComponent>
    </InteractiveScreen>
  );
};

export default QRScanner;
