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

const PLACEHOLDER_TEXT_COLOR = "rgba(28, 75, 61, .6)";
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
      <View style={styles.formContainer}>
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>
            {t("ContactUs.Name", currentLanguage)}
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder={`${t("ContactUs.Name", currentLanguage)}`}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            value={formInfo.name}
            onChangeText={(e) => dispatch({ type: "change_name", payload: e })}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>
            {t("ContactUs.Topic", currentLanguage)}
          </Text>
          <TextInput
            style={styles.inputField}
            placeholder={`${t("ContactUs.Topic", currentLanguage)}`}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            value={formInfo.topic}
            onChangeText={(e) => dispatch({ type: "change_topic", payload: e })}
          />
        </View>
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>
            {t("ContactUs.Message", currentLanguage)}
          </Text>
          <TextInput
            multiline
            textAlignVertical="top"
            style={[styles.inputField, { minHeight: 150 }]}
            placeholder={`${t("ContactUs.Message", currentLanguage)}`}
            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
            value={formInfo.message}
            onChangeText={(e) =>
              dispatch({ type: "change_message", payload: e })
            }
          />
        </View>
        <TouchableOpacity onPress={sendToEmail} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>
            {t("ContactUs.SendMessage", currentLanguage)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  inputField: {
    borderColor: Primarycolor1,
    borderWidth: 1,
    paddingVertical: 5,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "grey",
    fontFamily: "space-grotesk",
    color: Primarycolor1,
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
  formLabel: {
    ...stylesGlobal.paragraph_text,
  },
  sendButton: {
    alignSelf: "flex-end",
    backgroundColor: Primarycolor1,
    padding: 20,
    borderRadius: 5,
  },
  sendButtonText: {
    ...Buttons.main_buttonText,
  },
});
export default ContactUs;
