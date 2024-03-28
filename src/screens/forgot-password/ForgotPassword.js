import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import forgotPasswordStyles from "./forgotPasswordStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import { t, useLanguage } from "../../languages/LanguageHandler";
import BackButton from "../../components/BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const { currentLanguage } = useLanguage();

  const handleSendLink = () => {
    // Logic to send the link
  };

  return (
    <InteractiveScreen>
      <View style={forgotPasswordStyles.headerContainer}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={forgotPasswordStyles.headerText}>
          {t("ForgotPasswordScreen.Header", currentLanguage)}
        </Text>
      </View>

      <Text style={forgotPasswordStyles.description}>
        {t("ForgotPasswordScreen.Description", currentLanguage)}
      </Text>

      <Text style={forgotPasswordStyles.emailHeader}>E-mail</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        required
        placeholder="E-mail"
        style={forgotPasswordStyles.emailInput}
      />

      <TouchableOpacity
        style={forgotPasswordStyles.sendLinkButton}
        onPress={handleSendLink}
      >
        <Text style={forgotPasswordStyles.sendLinkButtonText}>
          {t("ForgotPasswordScreen.SendLinkButton", currentLanguage)}
        </Text>
      </TouchableOpacity>
    </InteractiveScreen>
  );
};

export default ForgotPassword;
