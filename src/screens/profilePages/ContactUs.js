
import React, { useReducer } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet, Alert, ScrollView,
} from "react-native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import * as Linking from "expo-linking";
import {
    Backgroundstyle,
    Primarycolor1,
    styles as stylesGlobal,
    Buttons, HeaderText,
} from "../../styles/Stylesheet";
import {useNavigation} from "@react-navigation/native";
import BackButton from "../../componets/BackButton";
import ScrollViewComponent from "../../componets/atoms/ScrollViewComponent";

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
    const navigation = useNavigation();
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
        <ScrollViewComponent >
            <View style={Backgroundstyle.interactive_screens}>
                <View style={styles1.header}>
                    {/* Back Button */}
                    <BackButton onPress={navigation.goBack}  />
                    {/* Headline */}
                    <Text style={styles1.headerText}>{t('ContactUs.Header',currentLanguage)} </Text>
                </View>
                <View>
                    <Text style={styles1.TextOnTheTop}>{t('ContactUs.TextOnTheTop',currentLanguage)}</Text>
                </View>
                <Text style={styles1.formLabel}>
                    {t("ContactUs.Name", currentLanguage)}
                </Text>

                <TextInput
                    style={styles1.inputField}
                    placeholder={`${t("ContactUs.Name", currentLanguage)}`}
                    placeholderTextColor="#8EA59E"
                    value={formInfo.name}
                    onChangeText={(e) => dispatch({ type: "change_name", payload: e })}
                />

                <Text style={styles1.formLabel}>
                    {t("ContactUs.Topic", currentLanguage)}
                </Text>
                <TextInput
                    style={styles1.inputField}
                    placeholder={`${t("ContactUs.Topic", currentLanguage)}`}
                    placeholderTextColor="#8EA59E"
                    value={formInfo.topic}
                    onChangeText={(e) => dispatch({ type: "change_topic", payload: e })}
                />


                <Text style={styles1.formLabel}>
                    {t("ContactUs.Message", currentLanguage)}
                </Text>
                <TextInput
                    multiline
                    textAlignVertical="top"
                    style={[styles1.inputField, { minHeight: 150 }]}
                    placeholder={`${t("ContactUs.Message", currentLanguage)}`}
                    placeholderTextColor="#8EA59E"
                    value={formInfo.message}
                    onChangeText={(e) => dispatch({ type: "change_message", payload: e })}
                />


                <TouchableOpacity onPress={sendToEmail} style={styles1.sendButton}>
                    <Text style={styles1.sendButtonText}>
                        {t("ContactUs.SendMessage", currentLanguage)}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollViewComponent>
    );
};
const styles1 = StyleSheet.create({
    TextOnTheTop:{
        color: Primarycolor1, fontSize: 20, margin: 20,marginBottom:20, textAlign: 'start',marginRight:50
    },

    header:{
        flexDirection:"row",marginTop:-30,marginRight:80,
    },
    headerText:{
        ...HeaderText.Header,marginTop:1,marginLeft:50,
    },

    formLabel: {
        ...stylesGlobal.menuItem_text,marginLeft: 20, marginBottom:10, marginTop:5, fontSize: 15,

    },
    inputField: {
        ...stylesGlobal.inputBox,
    },

    sendButton: {
        ...Buttons.main_button,marginTop:30,
    },
    sendButtonText: {
        ...Buttons.main_buttonText,
    },
});
export default ContactUs;