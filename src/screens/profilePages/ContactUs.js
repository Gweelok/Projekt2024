import React, { useReducer } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import * as Linking from "expo-linking";
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
    <View>
      <Text>{t("ContactUs.Name", currentLanguage)}</Text>
      <TextInput
        placeholder={`${t("ContactUs.Name", currentLanguage)}`}
        value={formInfo.name}
        onChangeText={(e) => dispatch({ type: "change_name", payload: e })}
      />
      <Text>{t("ContactUs.Topic", currentLanguage)}</Text>
      <TextInput
        placeholder={`${t("ContactUs.Topic", currentLanguage)}`}
        value={formInfo.topic}
        onChangeText={(e) => dispatch({ type: "change_topic", payload: e })}
      />
      <Text>{t("ContactUs.Message", currentLanguage)}</Text>
      <TextInput
        placeholder={`${t("ContactUs.Message", currentLanguage)}`}
        value={formInfo.message}
        onChangeText={(e) => dispatch({ type: "change_message", payload: e })}
      />
      <TouchableOpacity onPress={sendToEmail}>
        <Text>{t("ContactUs.SendMessage", currentLanguage)}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactUs;
