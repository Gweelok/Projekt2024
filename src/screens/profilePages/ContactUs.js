import React, { useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import * as Linking from "expo-linking";
import {
  Backgroundstyle,
  Primarycolor1,
  Primarycolor3,
  Primarycolor2,
  styles as stylesGlobal,
  Buttons,
} from "../../styles/Stylesheet";
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
    <View style={Backgroundstyle.interactive_screens}>
      <Text style={[stylesGlobal.formLabel, {marginRight: 310}]}>
        {t("ContactUs.Name", currentLanguage)}
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder={`${t("ContactUs.Name", currentLanguage)}`}
        placeholderTextColor="rgba(28, 75, 61, 0.4)"
        value={formInfo.name}
        onChangeText={(e) => dispatch({ type: "change_name", payload: e })}
      />

      <Text style={[stylesGlobal.formLabel, {marginRight: 310}]}>
        {t("ContactUs.Topic", currentLanguage)}
      </Text>
      <TextInput
        style={styles.inputField}
        placeholder={`${t("ContactUs.Topic", currentLanguage)}`}
        placeholderTextColor="rgba(28, 75, 61, 0.4)"
        value={formInfo.topic}
        onChangeText={(e) => dispatch({ type: "change_topic", payload: e })}
      />

      <Text style={[stylesGlobal.formLabel, {marginRight: 280}]}>
        {t("ContactUs.Message", currentLanguage)}
      </Text>
      <TextInput
        multiline
        textAlignVertical="top"
        style={[styles.inputField, { minHeight: 150 }]}
        placeholder={`${t("ContactUs.Message", currentLanguage)}`}
        placeholderTextColor="rgba(28, 75, 61, 0.4)"
        value={formInfo.message}
        onChangeText={(e) => dispatch({ type: "change_message", payload: e })}
      />

      <TouchableOpacity onPress={sendToEmail} style={Buttons.main_button}>
        <Text style={Buttons.main_buttonText}>
          {t("ContactUs.SendMessage", currentLanguage)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    ...stylesGlobal.inputBox,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
  },
  formContainer: {
    width: "75%",
  },
  formSection: {
    marginBottom: 20,
    gap: 5,
  },
});
export default ContactUs;
