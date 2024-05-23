import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";

import detailViewStyles from "./detailViewStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import { Ionicons } from "@expo/vector-icons";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";

import BackButton from "../../components/BackButton/BackButton";
import { t, useLanguage } from "../../languages/LanguageHandler";

import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";
import { openAddressOnMap } from "../../utils/uptainersUtils";

const DetailViews = ({ route }) => {
  const navigation = useNavigation();
  const details = route.params;
  const itemDescription = details?.itemDescription;
  const brandName = details?.brand?.brandName;
  const productName = details?.product?.productName;
  const imageUrl = details?.imageUrl;
  const uptainer = details?.uptainer;
  const { currentLanguage } = useLanguage();

  const [productDetails, setProductDetails] = useState(null);

  const handleTakePress = async () => {
    const product = {
      itemDescription,
      brandName,
      productName,
      imageUrl,
    };
    try {
      await AsyncStorage.setItem("product", JSON.stringify(product));
      setProductDetails(product);
    } catch (error) {
      console.error("Error saving product to AsyncStorage:", error);
    }

    navigation.navigate(Screens.TAKE_QR_SCANNER, {
      ...details,
      uptainer: uptainer,
    });
  };

  const displayTextValue = itemDescription;

  const openOnMap = async () => {
    
    openAddressOnMap({
      lat: uptainer.uptainerLatitude, 
      long: uptainer.uptainerLongitude, 
      name: uptainer.uptainerName
    })
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <BackButton
          onPress={navigation.goBack}
          style={detailViewStyles.backButton}
        />

        <View>
          <Image source={{ uri: imageUrl }} style={detailViewStyles.image} />

          <View style={detailViewStyles.detailContainer}>
            <View style={detailViewStyles.detailDivider}>
              <Text style={detailViewStyles.product}>{productName}</Text>
              <Text>{brandName}</Text>
            </View>

            <View style={detailViewStyles.detailDivider}>
              <TouchableOpacity
                onPress={openOnMap}
                style={detailViewStyles.locationContainer}
              >
                <Ionicons
                  name="location"
                  style={detailViewStyles.locationIcon}
                />
                <Text style={detailViewStyles.location}>
                  {uptainer.uptainerCity}, {uptainer.uptainerStreet},{" "}
                  {uptainer.uptainerZip}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {displayTextValue && (
            <Text style={detailViewStyles.text}>{displayTextValue}</Text>
          )}

          <TouchableOpacity
            onPress={handleTakePress}
            style={detailViewStyles.takeButton}
          >
            <Text style={detailViewStyles.takeButtonText}>
              {t("Detailviews.take", currentLanguage)}
            </Text>
          </TouchableOpacity>

          <Text
            style={detailViewStyles.productTakenLink}
            onPress={() => {
              navigation.navigate(Screens.PRODUCT_IS_TAKEN, details);
            }}
          >
            {t("Detailviews.product", currentLanguage)}
          </Text>
        </View>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default DetailViews;