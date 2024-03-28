import React, { useEffect, useState, useContext, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Linking,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getItemsInUptainer,
  createItem,
  updateItemById,
  getItemsDetails,
} from "../../utils/Repo/Items";
import { getUptainerById } from "../../utils/Repo/Uptainers";

import uptainerDetailsStyle from "./uptainerDetailsStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import ProductAlert from "../../components/ProductAlert/ProductAlert";
import { useNavigation } from "@react-navigation/native";

import Screens from "../../utils/ScreenPaths";
import { BadgeContext } from "../../contexts/BadgeContext/BadgeContext";
import { t, useLanguage } from "../../languages/LanguageHandler";

const UptainerDetails = ({ route }) => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const { setBadgeCount } = useContext(BadgeContext);
  const { currentLanguage } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [uptainerData, setuptainerData] = useState();
  const [itemsData, setitemsData] = useState([]);

  const [isAlerted, setisAlerted] = useState(false);
  const [addedItem, setaddedItem] = useState(false);
  const [addingItem, setaddingItem] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!(newItem && addedItem && !isLoading)) {
      return;
    }

    const fadeOut = () => {
      return setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000);
    };

    fadeOut();

    return () => {
      clearTimeout(fadeOut);
    };
  }, [addedItem, isLoading]);

  // props
  const [newItem, setnewItem] = useState(route.params.newItem);
  const uptainerId = route.params.uptainer.uptainerId;
  const scannedQRCode = route.params.scannedQRCode;

  useEffect(() => {
    fetchData();
  }, [route]);

  const onRefresh = () => {
    setRefreshing(true);
    // if updropped item exist set undefined to remove from list
    if (newItem) {
      setnewItem();
    }
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // if updropping item
      if (newItem && !addingItem) {
        // set undefined to prevent updropp again
        setaddingItem(true);

        updroppItem();
      }

      await Promise.all([fetchUptainerData(), fetchUptainerItems()]);
    } catch (error) {
      Alert.alert("Error", error);
      navigation.goBack();
    }

    setIsLoading(false);
    setRefreshing(false);
  };

  const updroppItem = async () => {
    try {
      if (newItem.itemUptainer == "Draft") {
        // item Already in Draft - update
        const updatedData = {
          ...newItem,
          itemUptainer: uptainerId,
        };
        await updateItemById(newItem.itemId, updatedData, newItem.image);
        setBadgeCount((prevCount) => prevCount - 1);
      } else {
        // New item - create
        await createItem(
          newItem.image,
          newItem.itemCategory,
          newItem.itemproduct,
          newItem.itemBrand,
          newItem.itemModel,
          newItem.itemcondition,
          newItem.itemDescription,
          scannedQRCode
        );
      }

      // done adding item
      setaddedItem(true);
    } catch (error) {
      // set undefined to remove from list
      setnewItem();
      Alert.alert(
        t("QRScanner.Error", currentLanguage),
        t("QRScanner.ErrorMsg1", currentLanguage)
      );
    }
  };

  const fetchUptainerData = async () => {
    // uptainer data from passed 'uptainerId'
    const uptainer = await getUptainerById(uptainerId);

    try {
      // uptainer image
      const storage = getStorage();
      const uptainerPathReference = ref(storage, uptainer.uptainerImage);
      const imageUrl = await getDownloadURL(uptainerPathReference);
      uptainer.uptainerImage = imageUrl;
    } catch (error) {
      uptainer.uptainerImage = "https://via.placeholder.com/200x200";
    }

    setuptainerData(uptainer);
  };

  const fetchUptainerItems = async () => {
    const items = await getItemsInUptainer(uptainerId, [
      newItem && !addedItem && newItem.itemId,
    ]);
    const updatedItems = await getItemsDetails(items);

    setitemsData(updatedItems);
  };

  const openAddressOnMap = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${uptainerData.uptainerLat},${uptainerData.uptainerLong}`;

    const url = Platform.select({
      ios: `${scheme}${uptainerData.uptainerName}@${latLng}`,
      android: `${scheme}${latLng}(${uptainerData.uptainerName})`,
    });

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Error", "Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert("Error", "An error occurred: " + err));
  };

  const renderItem = (item) => (
    <TouchableOpacity
      disabled={newItem && item.itemId == newItem.itemId && !addedItem}
      key={item.itemId}
      onPress={() => {
        navigation.navigate(Screens.DETAIL_VIEW, {
          ...item,
          uptainer: uptainerData,
        });
      }}
      style={uptainerDetailsStyle.item}
    >
      <View style={uptainerDetailsStyle.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={uptainerDetailsStyle.image}
        />

        {newItem && item.itemId == newItem.itemId && (
          <Animated.View
            style={[uptainerDetailsStyle.newItemStyle, { opacity: fadeAnim }]}
          >
            <ActivityIndicator
              style={uptainerDetailsStyle.newItemStyle}
              color={uptainerDetailsStyle.activityIndicator.color}
              size={"large"}
            ></ActivityIndicator>
          </Animated.View>
        )}
      </View>
      <Text style={uptainerDetailsStyle.productNameText}>
        {item.product?.productName}
      </Text>
    </TouchableOpacity>
  );

  const showAlert=()=>{
    if(newItem && addedItem && !isLoading){
      return(
        <ProductAlert isAlerted={isAlerted} setisAlerted={setisAlerted}></ProductAlert>
      )
    }
  }

  return (
    <InteractiveScreen>
      {showAlert()}

      <ScrollViewComponent refreshing={refreshing} onRefresh={onRefresh}>
        {/* should be replaced with back button*/}
        <TouchableOpacity
          style={uptainerDetailsStyle.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            style={uptainerDetailsStyle.backwardIcon}
          />
        </TouchableOpacity>

        <View>
          <ImageBackground
            style={uptainerDetailsStyle.detailsImage}
            source={{
              uri: uptainerData?.uptainerImage,
            }}
          >
            <TouchableOpacity
              onPress={openAddressOnMap}
              style={uptainerDetailsStyle.productLocation}
            >
              <Text style={uptainerDetailsStyle.productAddress}>
                {uptainerData?.uptainerName} / {uptainerData?.uptainerStreet}
              </Text>
              <Ionicons
                name="chevron-forward"
                style={uptainerDetailsStyle.forwardIcon}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={uptainerDetailsStyle.scrollViewContent}>
          {newItem && !isLoading && renderItem(newItem)}
          {itemsData.map((item) => renderItem(item))}
        </View>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default UptainerDetails;
