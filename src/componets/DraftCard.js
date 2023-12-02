import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Buttons, Primarycolor1 } from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DraftCard = ({
  props,
  navigation,
  onPress,
  onCancelPress,
  onDraftPress,
}) => {
  const { currentLanguage, setLanguage } = useLanguage();
  console.log("propsss", props);
  //below we used the props params to display
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.draftCard}
        activeOpacity={0.8}
        onPress={onDraftPress}
      >
        <TouchableOpacity style={styles.cancelIconContainer}>
          <Ionicons
            onPress={onCancelPress}
            name="close-outline"
            size={30}
            color="white"
            style={styles.cancelIcon}
          />
        </TouchableOpacity>

        <Image source={{ uri: props.imageUrl }} style={styles.draftImage} />
        <View style={styles.draftContent}>
          <Text style={styles.product}>{props.product?.productName}</Text>
          <Text style={styles.category}>{props.category?.categoryName}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.brandModelContainer}>
              <Text style={styles.brand} numberOfLines={1} ellipsizeMode="tail">
                {props.brand?.brandName}
                {props.model?.modelName ? "," : ""}
              </Text>
              {props.model?.modelName && (
                <Text
                  style={[styles.brand, { marginLeft: 2 }]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {props.model?.modelName}
                </Text>
              )}
            </View>
          </View>
          <Text
            style={[
              styles.description,
              { fontStyle: "normal", marginBottom: 10, fontWeight: "700" },
            ]}
          >
            {props.itemcondition}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {props.itemDescription}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={onPress}
          style={[Buttons.main_button, { borderWidth: 1, width: "50%" }]}
        >
          <Text style={Buttons.main_buttonText}>
            {t("UpdroppForm.scanButton", currentLanguage)}
          </Text>
        </Pressable>
        <View style={{ width: windowWidth / 2.3 }} />
      </View>
    </View>
  );
};

export default DraftCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%"
  },
  draftCard: {
    width: windowWidth / 1.2,
    height: windowHeight / 3,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: Primarycolor1,
    flexDirection: "row",
  },
  draftContent: {
    alignContent: "center",
    alignSelf: "center",
    // backgroundColor: "green",
    padding: 20,
    width: windowWidth / 2.4,

    // justifyContent: "center",
    // alignItems: "center",

    // padding: 20,
  },
  draftImage: {
    width: windowWidth / 2.4,
    height: windowHeight / 3.06,
  },
  product: {
    fontWeight: "700",
    fontSize: 20,
    color: Primarycolor1,
    marginBottom: 10,
  },
  category: {
    fontWeight: "500",
    fontSize: 16,
    color: Primarycolor1,
    marginBottom: 10,
  },
  brand: {
    fontWeight: "500",
    fontSize: 17,
    color: Primarycolor1,
    marginBottom: 10,
  },
  brandModelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: windowWidth / 2.4,
  },
  description: {
    fontSize: 14,
    color: Primarycolor1,
    fontStyle: "italic",
  },
  cancelIcon: {
    // top: 20,
  },
  cancelIconContainer: {
    position: "absolute",
    zIndex: 999,
    right: 0,
    backgroundColor: Primarycolor1,
  },
});
