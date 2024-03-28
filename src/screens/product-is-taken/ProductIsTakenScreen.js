import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";

import productIsTakenStyles from "./productIsTakenStyles";
import { t, useLanguage } from "../../languages/LanguageHandler";
import { updateItemToTaken } from "../../utils/Repo/Items";
import Screens from "../../utils/ScreenPaths";

const ProductIsTakenScreen = ({ navigation, route }) => {
  const productItem = route?.params;
  const { currentLanguage } = useLanguage();

  const productIsTaken = async () => {
    try {
      const itemId = productItem?.itemId;
      if (itemId) {
        // This function will be replaced to notifyItemAsTaken since users can only notify.
        await updateItemToTaken(itemId);
        navigation.navigate(Screens.THANK_YOU);
      } else {
        navigation.goBack()
      }
    } catch (error) {
      console.error("Error marking product as taken:", error);
    }
  };

  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={productIsTakenStyles.container}>
          <HeaderTitle
            onRightIconPress={() => {
              navigation.goBack();
            }}
            rightIcon="close-outline"
          />
          <Image
            style={productIsTakenStyles.takenImage}
            source={{ uri: productItem?.imageUrl }}
          />
          <Text style={productIsTakenStyles.apologyText}>
            {t("ProductIsTakenScreen.apology", currentLanguage)}
          </Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={productIsTakenStyles.targetButton}
            onPress={() => {
              productIsTaken();
            }}
          >
            <Text style={productIsTakenStyles.targetText}>
              {t("ProductIsTakenScreen.takenButton", currentLanguage)}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollViewComponent>
    </InteractiveScreen>
  );
};

export default ProductIsTakenScreen;
