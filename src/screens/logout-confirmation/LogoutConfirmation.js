import React from "react";
import { Text, TouchableOpacity } from "react-native";

import logoutConfirmation from "./logoutConfirmationStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import { useLanguage, t } from "../../languages/LanguageHandler";
import { firebaseAurth } from "../../utils/Repo/Firebase";
import Screens from "../../utils/ScreenPaths";

import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";



const LogoutConfirmation = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    signOut(firebaseAurth)
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <InteractiveScreen>

      <Text style={logoutConfirmation.confirmMessage}>
        {t("LogoutConfirmation.confirmMessage", currentLanguage)}
      </Text>

      <TouchableOpacity style={logoutConfirmation.logOutButton} onPress={handleLogout}>
        <Text style={logoutConfirmation.logOutButtonText}>
          {t("LogoutConfirmation.logoutButton", currentLanguage)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={logoutConfirmation.cancelButton} onPress={() => navigation.navigate(Screens.PROFILE)}>
        <Text style={logoutConfirmation.cancelButtonText}>
          {t("LogoutConfirmation.cancelButton", currentLanguage)}
        </Text>
      </TouchableOpacity>

    </InteractiveScreen>

  );
}

export default LogoutConfirmation;
