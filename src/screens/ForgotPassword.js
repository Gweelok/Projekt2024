import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { 
    styles,
    Backgroundstyle,
    Buttons,
    Primarycolor1, 
} from "../styles/Stylesheet";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const { currentLanguage } = useLanguage();

    const handleSendLink = () => {
        // Logic to send the link
    };

    return (
        <View style={Backgroundstyle.interactive_screens}>
            <View style={GlobalStyle.BodyWrapper}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <BackButton onPress={() => navigation.goBack()} />
                    <Text style={[styles.Header_Primarycolor1, styles.Header]}>
                        {t("ForgotPasswordScreen.Header", currentLanguage)}
                    </Text>
                </View>

                <Text style={[{ textAlign: "center"}, styles.Header_Primarycolor1]}>
                    {t("ForgotPasswordScreen.Description", currentLanguage)}
                </Text>
                
                <TextInput
                    placeholder={t("ForgotPasswordScreen.EmailLabel", currentLanguage)}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    clearButtonMode={"always"}
                    required
                    style={[styles.inputBox, { marginBottom: 20, marginTop: 15, fontSize: 16, fontFamily: "space-grotesk" }]}
                />

                <TouchableOpacity 
                    style={Buttons.main_button}
                    onPress={handleSendLink}>
                    <Text style={Buttons.main_buttonText}>
                        {t("ForgotPasswordScreen.SendLinkButton", currentLanguage)}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default ForgotPassword;
