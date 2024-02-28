import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign"; // Replace with the appropriate icon library
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Buttons, styles } from "../../styles/Stylesheet";
import {
  createItem,
  getUptainerFromQR,
  getUptainerById,
  QRCodeExists,
  updateItemById,
  createItemDraft,
} from "../../utils/Repo";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";
import { LoaderContext } from "../../componets/LoaderContext";
import GlobalStyle from "../../styles/GlobalStyle";
import { BadgeContext } from "./BadgeContext";
import { Permissions } from "../../utils/Permissions";
import Screens from "../../utils/ScreenPaths";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


const QRScanner = ({ route, navigation }) => {
  const itemData = route.params;


  const { badgeCount, setBadgeCount } = useContext(BadgeContext);
  const { currentLanguage } = useLanguage();
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scannedQRCode, setScannedQRCode] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoaderContext);




  useEffect(() => {
    Permissions.getCamera().then((loc) => {
      setHasPermission(true)
    }).catch(() => {
      Alert.alert("Error", t("LocationPermission.error", currentLanguage))
    })
  }, []);

  alertAddToDraft = () => {
    Alert.alert(
      t("QRScanner.Error", currentLanguage),
      t("QRScanner.QRCodeNotFound", currentLanguage),
      [
        {
          text: t("QRScanner.OK", currentLanguage),
          onPress: () => {
            addToDraft()
          },
        },
      ]
    );
  }


  addToDraft = async () => {
    setIsLoading(true)

    // check if passed item already in draft
    if (itemData?.itemUptainer == "Draft") {
      // update draft item
      const updatedData = {
        itemproduct: itemData?.product,
        itemBrand: itemData?.brand,
        itemModel: itemData?.model,
        itemCategory: itemData?.category,
        itemDescription: itemData?.description,
        itemcondition: itemData?.condition
      }
      await updateItemById(itemData?.itemId, updatedData, itemData?.image)

      setIsLoading(false)
      navigation.reset({
        index: 0,
        routes: [{ name: Screens.MY_DRAFTS }, { name: Screens.PRODUCT_SAVED }]
      })
    } else {
      // add to draft
      const response = await createItemDraft(
        itemData?.product,
        itemData?.brand,
        itemData?.model,
        itemData?.category,
        itemData?.image,
        itemData?.description,
        itemData?.condition
      );

      setIsLoading(false)

      if (response.draftAdded) {
        navigation.reset({
          index: 0,
          routes: [{ name: Screens.MY_DRAFTS }, { name: Screens.PRODUCT_SAVED }]
        })
        setBadgeCount((prevCount) => prevCount + 1)
      } else {
        Alert.alert(t("QRScanner.Error", currentLanguage), t("UpdroppForm.maxDraft", currentLanguage))
      }
    }
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    // disable auto QR scan handler
    setScanned(true)


    const scannedQRCodeExist = await QRCodeExists(data);


    if (scannedQRCodeExist === "Draft") {
      setScannedQRCode("")
      setIsActive(false);
      Alert.alert(t("QRScanner.Error", currentLanguage), t("QRScanner.QRCodeNotFound1", currentLanguage));
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

    try {
      if (scannedQRCode) {
        // unnecessary to get uptainer id then fetch it's data separately
        const uptainerId = await getUptainerFromQR(scannedQRCode);
        const uptainer = uptainerId ? await getUptainerById(uptainerId) : null;

        // updropp item
        if (uptainer) {
          if(itemData.image){
            itemData.imageUrl = itemData.image.uri
          }else{
            const storage = getStorage();
            const pathReference = ref(storage,"Items/Default.jpg");
            const url = await getDownloadURL(pathReference);
            itemData.imageUrl = url
          }



          navigation.reset({
            index: 0,
            routes: [{ name: Screens.MAP }, {
              name: Screens.UPTAINER_DETAILS, params: {
                uptainerData: {
                  name: uptainer.uptainerName,
                  location: uptainer.uptainerStreet,
                  uptainerImage: uptainer.uptainerImage,
                  latitude: uptainer.uptainerLat,
                  longitude: uptainer.uptainerLong,
                },
                newItem: itemData,
                scannedQRCode: scannedQRCode
              }
            }]
          })


        } else {
          setIsLoading(false);
          alertAddToDraft()
        }
      } else {
        setIsLoading(false);
        alertAddToDraft()
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert(t("QRScanner.Error", currentLanguage), t("QRScanner.ErrorMsg1", currentLanguage));
    }

  };

  return (
    <ScrollViewComponent style={GlobalStyle.BodyWrapper}>
      <View style={{ marginTop: 40 }}>

        <View style={styles.header}>
          <Text style={styles.headline}>
            {t("AddQRScanner.Scan", currentLanguage)}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.goBack() }} disabled={isLoading}>
            <Icon size={30} name="close" style={styles.closeButtonIcon} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.paragraph_text}>
            {t("QRScanner.Header", currentLanguage)}
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
                  <Pressable
                    onPress={handleSaveCode}
                    disabled={isLoading}
                    style={[Buttons.main_button, !isActive && { backgroundColor: "red", borderColor: "red" }]}>
                    <Text style={Buttons.main_buttonText}>
                      {t("QRScanner.SaveCode", currentLanguage)}
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    onPress={handleScanAgain}
                    disabled={isLoading}
                    style={Buttons.secondary_button}>
                    <Text style={Buttons.secondary_buttonText}>
                      {t("QRScanner.ScanAgain", currentLanguage)}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.paragraph_text}>
            {t("QRScanner.Bottom", currentLanguage)}
          </Text>
        </View>

      </View>
    </ScrollViewComponent>
  );
};

export default QRScanner;