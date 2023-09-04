import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput , Pressable , Alert } from 'react-native';
import { styles,
    Backgroundstyle,
    Buttons,
    Primarycolor1,
}
    from '../styles/Stylesheet';
import { Ionicons } from '@expo/vector-icons';
import {t, useLanguage} from "../Languages/LanguageHandler"; // or any other icon library you prefer
import { signInUser } from '../utils/Repo';//function to login, only needs email and password... returns a boolean
import { firebaseAurth } from '../utils/Firebase';
import GlobalStyle from "../styles/GlobalStyle";

const SignIn = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('true'); // to check on password
    const [showPassword, setShowPassword] = useState(false);

    const { currentLanguage, setLanguage } = useLanguage();

    //To check on password
    const CheckPassword = (text) => {
        onChangePassword(text);
        setPasswordCheck(text.length >= 8); // it must be at least 8 chars
    };
    //Check on both
    const handleSubmit = () => {
        if (passwordCheck) {
            signInUser(email, password);
            if(firebaseAurth.currentUser !== null) {
                navigation.navigate('Homepage')
            }
        } else {
            Alert.alert('Password');
        }
    };
    //check if pass should be shown
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    let Header= t('SignInScreen.Headline', currentLanguage);
    return (

        <View style={Backgroundstyle.informationScreens}>
            <View style={GlobalStyle.BodyWrapper}>
            <Text style={[styles.Header_Primarycolor1,styles.Header]}>{Header}</Text>
            <TextInput
                placeholder="E-mail"
                value={email}
                onChangeText={onChangeEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                clearButtonMode={"always"}
                style={styles.inputBox}
            />

            <View style={[styles.inputBox , {flexDirection:"row"}]}>
                <TextInput
                    value={password}
                    onChangeText={CheckPassword}
                    placeholder={'Kodeord'}
                    keyboardType={'default'}
                    secureTextEntry={!showPassword}
                    style={{flex:1 , fontSize: 16, fontFamily: 'space-grotesk',}}
                />
                <Ionicons
                    name={showPassword ? 'ios-eye-off' : 'ios-eye'}
                    size={18}
                    color={Primarycolor1}
                    style={styles.Icon_container}
                    onPress={togglePasswordVisibility}
                />
            </View>
            { //Check on the password
                passwordCheck ? null : <Text style={SignUpStyles.text_Tertiary}> {t('SignUpScreen.passwordmsg', currentLanguage)} </Text>
            }
            <Pressable onPress={handleSubmit} style={Buttons.main_button}>
                <Text style={Buttons.main_buttonText}>{Header}</Text>
            </Pressable>

            <Pressable onPress={() => {  }}>
                <Text style={SignUpStyles.text_forget_pw}>{t("SignInScreen.ForgetPwHint", currentLanguage)}</Text>
            </Pressable>

            <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
                <View style={SignUpStyles.container}>
                    <Text style={Buttons.SocialMediabuttonText}> Continue with Facebook</Text>
                </View>
            </Pressable>

            <Pressable onPress={handleSubmit}  style={Buttons.buttongoogle}>
                <View style={SignUpStyles.container}>
                    <Text style={Buttons.SocialMediabuttonText}> Continue with Google</Text>
                </View>
            </Pressable>

            <Pressable onPress={() => {
                navigation.navigate('SignUp')
            }}>
                <Text style={SignUpStyles.text_Tertiary}>{t("SignInScreen.SignUpHint", currentLanguage)}</Text>
            </Pressable>
        </View>
        </View>
    );
}

const SignUpStyles = StyleSheet.create({
    text_forget_pw:{
        marginTop: 10,
        color : "#07A0A2",
        textAlign: 'center',
        fontSize: 15,
    },

    text_Tertiary: {
        marginBottom: 10,
        color : "#07A0A2",
        textAlign: 'center',
        fontSize: 15,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

});

export default SignIn;
