import { useState, useEffect } from "react"
import CustomInput1 from "../atoms/CustomInput1"
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"
import { styles, Primarycolor1, Primarycolor3 } from "../../styles/styleSheet"
import { windowHeight, windowWidth } from "../../utils/Dimensions"
import { t, useLanguage } from "../../Languages/LanguageHandler"

import ErrorBanner from '../atoms/ErrorBanner'
import PasswordInput from "./PasswordInput"
const LoginForm = ({ navigation}) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(true); // to check on password
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error msg");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [userLogged, setUserLogged] = useState(false);
    const { currentLanguage, setLanguage } = useLanguage();

    //To check on email
    const onChangeEmailHandler = (text) => {
        onChangeEmail(text);
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (formSubmitted) setEmailValid(emailPattern.test(text));
    };

    //To check on password
    const CheckPassword = (text) => {
        onChangePassword(text);
        setPasswordCheck(text.length >= 8); // it must be at least 8 chars
    };

    // Hide the banner when email or password is edited
    useEffect(() => {
        setShowError(false);
    }, [email, password]);

    //Check on both
    const handleSubmit = () => {
        setFormSubmitted(true);
        // Check if email is empty
        if (email.trim() === "") {
            setShowError(true);
            setErrorMessage([t("loginScreen.fields",currentLanguage)]);
            setEmailValid(false);
            setPasswordCheck(true);
            return; // Return early since email is a prerequisite for password check
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email) && email.trim()!=="") {
            setShowError(true);
            setErrorMessage(t('loginScreen.validemail', currentLanguage));
            setEmailValid(false);
            setPasswordCheck(true);
            return; // Return early since we need a valid email before checking password
        }

        // Check if password is empty only if email is valid
        if (password.trim() === "") {
            setShowError(true);
            setErrorMessage([t("loginScreen.fields",currentLanguage)]);
            setPasswordCheck(false);
            setEmailValid(true);
            return; // Return early to ask for password input
        }

        // Validate password length
        if (password.length < 8 && password.trim()!=="") {
            setShowError(true);
            setErrorMessage(t("loginScreen.passwordmsg",currentLanguage));
            setPasswordCheck(false);
            setEmailValid(true);
            return; // Return early since password needs to meet length requirement
        }

        // If all validations pass
            setShowError(false);
            // signInUser(email, password, navigation);
        
            if(email === 'info@updropp.dk' && password === "12345678"){
                // setUserLogged(true)
                navigation.navigate("Home");
            }
    };


    //Fn to navigate to the Homepage if the user is logged in
    // onAuthStateChanged(firebaseAurth, async (user) => {
    //     if (user) {
    //         setUserLogged(true);
    //     } else {
    //         setUserLogged(false);
    //     }
    // });
    if (userLogged) {
        navigation.navigate("Home");
    }

    return (
        <SafeAreaView style={style.container}>
            {showError && <ErrorBanner message={errorMessage} />}
            <Text style={style.title}>{t("loginScreen.header", currentLanguage)}</Text>
            <CustomInput1 placeholder='E-mail' value={email} onChange={onChangeEmailHandler}></CustomInput1>
            <PasswordInput password={password} CheckPassword={CheckPassword} passwordCheck={passwordCheck} formSubmitted={formSubmitted} />
            <Pressable style={style.button} onPress={handleSubmit}><Text style={style.buttonText}>{t("loginScreen.login", currentLanguage)}</Text></Pressable>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        marginLeft: windowWidth * 0.05,
        marginTop: windowHeight * 0.33
    },
    
    button: {
        height: 45,
        marginTop: 15,
        padding: 10,
        backgroundColor: Primarycolor1,
        
    },
    buttonText: {
        color: Primarycolor3,
        alignSelf: 'center',
        fontSize: 16
    },
    title: {
        color: Primarycolor1,
        fontSize: 30
    }
})
export default LoginForm