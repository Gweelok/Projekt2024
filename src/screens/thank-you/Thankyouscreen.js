import { t, useLanguage } from "../../languages/LanguageHandler";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { Text, View } from "react-native";

import React from "react";
import thankYouStyles from "./thankYouStyles";
import MessageScreen from "../../templates/standardScreens/messageScreen";

import Screens from "../../utils/ScreenPaths";
import HeaderTitle from "../../components/HeaderTitle/HeaderTitle";
import { useNavigation } from "@react-navigation/native";

const ThankYouscreen = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  return (
    <MessageScreen>
      <ScrollViewComponent style={thankYouStyles.topSpacer}>
        <HeaderTitle
          onRightIconPress={() => {
            navigation.navigate(Screens.HOME);
          }}
          rightIcon="close-outline"
        />

        <View style={thankYouStyles.textContainer}>
          <Text style={thankYouStyles.text}>
            {t("thankYouScreen.header", currentLanguage)}
          </Text>
        </View>
      </ScrollViewComponent>
    </MessageScreen>
  );
};
export default ThankYouscreen;
