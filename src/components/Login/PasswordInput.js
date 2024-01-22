import { useState } from "react";
import { StyleSheet } from "react-native"
import { View, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Primarycolor1, Primarycolor2, styles } from "../../styles/styleSheet";
import { t, useLanguage } from "../../Languages/LanguageHandler"

const PasswordInput = ({ password, CheckPassword, passwordCheck, formSubmitted}) => {
    const [showPassword, setShowPassword] = useState(false);
    const {currentLanguage} = useLanguage()
    //check if pass should be shown
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <View style={[styles.inputBox , {flexDirection:"row", marginTop: 15, borderWidth: 3,}, (!passwordCheck && formSubmitted) && style.errorInputBox]}>

                <TextInput
                    value={password}
                    onChangeText={CheckPassword}
                    placeholder={`${t("loginScreen.password", currentLanguage)}`}
                    placeholderTextColor="#8EA59E"
                    keyboardType={'default'}
                    secureTextEntry={!showPassword}
                    style={[style.input, {color: password.length ? Primarycolor1 : Primarycolor2,}]}

                />
                <Ionicons
                        name={showPassword ? 'ios-eye-off' : 'ios-eye'}
                        size={18}
                        color={Primarycolor1}
                        style={styles.Icon_container}
                        onPress={togglePasswordVisibility}
                        />
            </View>
    )
}

const style = StyleSheet.create({
    errorInputBox: {
        borderColor: "#AA0000",
        borderWidth: 3,
    },
    input: {
        flex: 1,
        fontFamily: 'space-grotesk',
        fontSize: 15
    }
})

export default PasswordInput