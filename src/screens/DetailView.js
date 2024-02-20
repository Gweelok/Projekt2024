import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { Backgroundstyle } from "../styles/Stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Navigationbar from "../componets/Navigationbar";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles, Buttons, Primarycolor1 } from "../styles/Stylesheet";
import * as LinkingExpo from "expo-linking"; // Import Expo Linking
import BackButton from "../componets/BackButton";
import {t, useLanguage} from "../Languages/LanguageHandler";
import GlobalStyle from "../styles/GlobalStyle";

const DetailViews = ({ navigation, route }) => {
  const details = route.params;
  const itemDescription = details.itemDescription;
  const brandName = details.brandName;
  const productName = details.productName;
  const imageUrl = details.imageUrl;
  const uptainer = details.uptainer;
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

    navigation.navigate("TakeQRScanner", {
      product: productName,
      brand: brandName,
      description: itemDescription,
      image: imageUrl,
      itemId: details?.data,
      uptainer: uptainer
    });
  };

  const displayTextValue = itemDescription;

  const openAddressOnMap = () => {
    const scheme = Platform.select({
      ios: "maps://0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${uptainer.uptainerLatitude},${uptainer.uptainerLongitude}`;
    const url = Platform.select({
      ios: `${scheme}${uptainer.name}@${latLng}`,
      android: `${scheme}${latLng}(${uptainer.name})`,
    });
    console.log(url);
    Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.log("Can't handle url: " + url);
          } else {
            return Linking.openURL(url);
          }
        })
        .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={[Backgroundstyle.interactive_screens]}>
      <ScrollViewComponent style={GlobalStyle.BodyWrapper}>
        <BackButton onPress={navigation.goBack} style={Buttons.backButton} />
        <View>
          <Image source={{ uri: imageUrl }} style={DetailView.image} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={{ width: "48%" }}>
              <Text style={DetailView.product}>{productName}</Text>
              <Text>{brandName}</Text>
            </View>
            <View style={{ width: "48%" }}>
              <TouchableOpacity
                onPress={openAddressOnMap}
                style={DetailView.locationContainer}
              >
                <Ionicons name="location" size={15} color={Primarycolor1} />
                <Text style={DetailView.location}>
                  {uptainer.uptainerCity}, {uptainer.uptainerStreet},{" "}
                  {uptainer.uptainerZip}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {displayTextValue && (
            <Text style={DetailView.text}>{displayTextValue}</Text>
          )}
          <TouchableOpacity
            onPress={handleTakePress}
            style={[Buttons.main_button, { marginTop: 20 }]}
          >
            <Text style={Buttons.main_buttonText}>
              {t("Detailviews.take", currentLanguage)}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.link, { marginTop: 10 }]}
            onPress={() => {
              navigation.navigate("ProductIsTakenScreen", details);
            }}
          >
            {t("Detailviews.product", currentLanguage)}
          </Text>
        </View>
      </ScrollViewComponent>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

const DetailView = StyleSheet.create({
  /* container: {
    justifyContent: "center",
    //alignItems: "center",
  }, */

  image: {
    height: 300,
    width: "100%",
    marginTop: 20,
  },

  text: {
    paddingTop: 13,
    height: 100,
    borderRadius: 1,
    marginTop: 0,
    marginRight: 35,
    color: Primarycolor1,
  },

  /*   TagButton: {
    backgroundColor: Primarycolor1,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
  }, 

  Tag: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },

  */

  product: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
    color: Primarycolor1,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },

  leftInfo: {
    alignItems: "flex-start",
    width: "48%",
  },

  rightInfo: {
    width: "48%",
  },

  location: {
    color: Primarycolor1,
    //textAlign: "right",
    textDecorationLine: "underline",
    marginTop: 5,
    fontSize: 12,
  },
  
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DetailViews;
