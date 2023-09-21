import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Backgroundstyle } from "../styles/Stylesheet";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Navigationbar from "../componets/Navigationbar";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Primarycolor1 } from "../styles/Stylesheet";
import GlobalStyle from "../styles/GlobalStyle";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import * as Linking from "expo-linking";
import { t, useLanguage } from "../Languages/LanguageHandler";

const DetailViews = ({ navigation, route }) => {
  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component

  // route gets itemDescription, imageUrl, brandName and ProductName  from UptainerDetails screen
  const details = route.params;
  const itemDescription = details.itemDescription;
  const brandName = details.brandName;
  const productName = details.productName;
  const imageUrl = details.imageUrl;
  const uptainer = details.uptainer;
  console.log("uptainer", uptainer);
  const handlePress = () => {
    navigation.goBack();
  };

  const displayTextValue = itemDescription; // displays item description
  const TagButton = "Tag";

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
    <View style={Backgroundstyle.interactive_screens}>
      <ScrollViewComponent>
        <TouchableOpacity onPress={handlePress}>
          <Ionicons
            name="chevron-back-outline"
            size={36}
            style={DetailView.arrow}
          />
        </TouchableOpacity>
        <View style={DetailView.container}>
          <Image source={{ uri: imageUrl }} style={DetailView.image} />
          <View style={DetailView.infoContainer}>
            <View style={DetailView.leftInfo}>
              <Text style={DetailView.product}>{productName}</Text>
              <Text style={DetailView.brand}>{brandName}</Text>
            </View>

            <View style={DetailView.rightInfo}>
              <TouchableOpacity
                onPress={openAddressOnMap}
                style={DetailView.locationContainer}
              >
                <Ionicons name="location" size={15} color={Primarycolor1} />
                <Text style={DetailView.location}>
                {uptainer.uptainerCity}, {uptainer.uptainerStreet}, {uptainer.uptainerZip}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={DetailView.text}>{displayTextValue}</Text>
          <TouchableOpacity onPress={""} style={DetailView.TagButton}>
            <Text style={DetailView.Tag}>{TagButton}</Text>
          </TouchableOpacity>
          <Text
            style={{ color: Primarycolor1, textDecorationLine: "underline" }}
            onPress={() => navigation.navigate("ProductIsTakenScreen", details)} //
          >
            {t("ProductIsTakenScreen.productNotListed", currentLanguage)}
          </Text>
        </View>
      </ScrollViewComponent>

      <Navigationbar navigation={navigation} />
    </View>
  );
};
const DetailView = StyleSheet.create({
  container: {
    // paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1%",
    marginLeft: "1%",
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 15,
  },
  text: {
    paddingTop: 10,
    width: "70%",
    height: 100,
    borderRadius: 1,
    // paddingHorizontal: 30,
    marginTop: 15,
  },
  arrow: {
    height: 42,
    width: 42,
    color: "white",
    marginLeft: "4%",
    backgroundColor: Primarycolor1,
  },
  TagButton: {
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

  product: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "90%",
    marginTop: 10,
  },
  leftInfo: {
    alignItems: "flex-start",
    width: "60%",
  },
  rightInfo: {
    // alignItems: "flex-end",
    width: "40%",
  },
  location: {
    color: Primarycolor1,
    textAlign: "right",
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
