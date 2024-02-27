import React, { useEffect } from "react";
import {View, Text, TouchableOpacity, BackHandler, ScrollViewComponent} from "react-native";
import { styles, Backgroundstyle, Buttons } from "../../styles/Stylesheet";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { firebaseAurth } from "../../utils/Firebase";
import { signOut } from "firebase/auth";
import GlobalStyle from "../../styles/GlobalStyle";


const LogoutConfirmation = ({ navigation }) => {
  const { currentLanguage } = useLanguage();

  const handleLogout = () => {
    signOut(firebaseAurth)
      .catch((error) => {
        console.log(error);
      });
  };

 
  return (
      <View style={Backgroundstyle.interactive_screens}>
      <View style={GlobalStyle.BodyWrapper}>

      <Text style={[styles.article_text]}>
        {t("LogoutConfirmation.confirmMessage", currentLanguage)}
      </Text>

      <TouchableOpacity 
        style={[Buttons.main_button, { marginTop: 20, marginBottom: 10}]}
        onPress={handleLogout}>
        <Text style={Buttons.main_buttonText}>
        {t("LogoutConfirmation.logoutButton", currentLanguage)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={ Buttons.secondary_button }
        onPress={() => navigation.navigate("Profile")}>
        <Text style={Buttons.secondary_buttonText}>
        {t("LogoutConfirmation.cancelButton", currentLanguage)}        
        </Text>
      </TouchableOpacity>
    </View>
      </View>

  );
}

export default LogoutConfirmation;
