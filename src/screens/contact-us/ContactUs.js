import React, { useReducer } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import * as Linking from "expo-linking";

import contactUsStyles from "./contactUsStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import BackButton from "../../components/BackButton/BackButton";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import { useNavigation } from "@react-navigation/native";

function reducer(state, action) {
  switch (action.type) {
    case "change_name":
      return { ...state, name: action.payload };
    case "change_topic":
      return { ...state, topic: action.payload };
    case "change_message":
      return { ...state, message: action.payload };
  }
}

const ContactUs = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();
  const [formInfo, dispatch] = useReducer(reducer, {
    name: "",
    topic: "",
    message: "",
  });
  function sendToEmail() {
    const emailMessage = `Hello! ${
      formInfo.name ? `My name is ${formInfo.name}.` : null
    }. I would like help regarding : 
    ${formInfo.message}`;

    const url = `mailto:info@updropp.dk?subject=${formInfo.topic}&body=${emailMessage}`;
    Linking.canOpenURL(url)
      .then((succes) => {
        if (succes) {
          Linking.openURL(url);
        } else {
          Alert("Error,can't open email");
        }
      })
      .catch((e) => Alert(e));
  }
  return (
    <InteractiveScreen>
      <ScrollViewComponent>
        <View style={contactUsStyles.header}>
          {/* Back Button */}
          <BackButton onPress={navigation.goBack} />
          {/* Headline */}
          <Text style={contactUsStyles.headerText}>
            {t("ContactUs.Header", currentLanguage)}{" "}
          </Text>
        </View>

        <View>
          <Text style={contactUsStyles.TextOnTheTop}>
            {t("ContactUs.TextOnTheTop", currentLanguage)}
          </Text>
        </View>

        <Text style={contactUsStyles.formLabel}>
          {t("ContactUs.Name", currentLanguage)}
        </Text>

        <TextInput
          style={contactUsStyles.inputField}
          placeholder={`${t("ContactUs.Name", currentLanguage)}`}
          placeholderTextColor={contactUsStyles.placeholderTextColor.color}
          value={formInfo.name}
          onChangeText={(e) => dispatch({ type: "change_name", payload: e })}
        />

        <Text style={contactUsStyles.formLabel}>
          {t("ContactUs.Topic", currentLanguage)}
        </Text>

        <TextInput
          style={contactUsStyles.inputField}
          placeholder={`${t("ContactUs.Topic", currentLanguage)}`}
          placeholderTextColor={contactUsStyles.placeholderTextColor.color}
          value={formInfo.topic}
          onChangeText={(e) => dispatch({ type: "change_topic", payload: e })}
        />

        <Text style={contactUsStyles.formLabel}>
          {t("ContactUs.Message", currentLanguage)}
        </Text>

        <TextInput
          multiline
          textAlignVertical="top"
          style={contactUsStyles.messageInputField}
          placeholder={`${t("ContactUs.Message", currentLanguage)}`}
          placeholderTextColor={contactUsStyles.placeholderTextColor.color}
          value={formInfo.message}
          onChangeText={(e) => dispatch({ type: "change_message", payload: e })}
        />

        <TouchableOpacity
          onPress={sendToEmail}
          style={contactUsStyles.sendButton}
        >
          <Text style={contactUsStyles.sendButtonText}>
            {t("ContactUs.SendMessage", currentLanguage)}
          </Text>
        </TouchableOpacity>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default ContactUs;
