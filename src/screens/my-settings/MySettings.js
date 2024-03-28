import React, { useContext } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";

import { t, useLanguage } from "../../languages/LanguageHandler";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import mySettingsStyle from "./mySettingsStyles";

import { MenuItems } from "../../components/menu-items/MenuItems";

import BackButton from "../../components/BackButton/BackButton";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const MY_SETTINGS_SCREEN = {
  AccountSettings: "AccountSettings",
  Notifications: "Notifications",
  ChangePassword: "ChangePassword",
};

const MySettings = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage(); // Move the hook inside the functional component
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const backButtonPressed = () => navigation.goBack();

  const handlePress = (selectedOption) => {
    setIsLoading(true);
    if (selectedOption === MY_SETTINGS_SCREEN.AccountSettings) {
      navigation.navigate(Screens.ACCOUNT_SETTINGS);
    } else if (selectedOption === MY_SETTINGS_SCREEN.Notifications) {
      navigation.navigate(Screens.NOTIFICATIONS);
    } else if (selectedOption === MY_SETTINGS_SCREEN.ChangePassword) {
      navigation.navigate(Screens.CHANGE_PASSWORD);
    }
  };

  return (
    <InteractiveScreen>
      <View style={mySettingsStyle.header}>
        <BackButton onPress={backButtonPressed} />
        <Text style={mySettingsStyle.headerText}>
          {t("MySettingsScreen.Header", currentLanguage)}
        </Text>
      </View>

      <View style={mySettingsStyle.settingsOptions}>
        <MenuItems
          msg={t("AccountSettingsScreen.Header", currentLanguage)}
          onPress={() => handlePress(MY_SETTINGS_SCREEN.AccountSettings)}
        />
        <MenuItems
          msg={t("NotificationsScreen.Header", currentLanguage)}
          onPress={() => handlePress(MY_SETTINGS_SCREEN.Notifications)}
        />
      </View>

    </InteractiveScreen>
  );
};

// Add prop validation
MySettings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MySettings;
