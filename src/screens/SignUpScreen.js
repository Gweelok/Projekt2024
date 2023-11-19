import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  styles,
  Backgroundstyle,
  Primarycolor2,
  Buttons,
  Primarycolor1,
} from "../styles/Stylesheet";
import { Ionicons, Octicons } from "@expo/vector-icons"; // or any other icon library you prefer
import { useLanguage, t } from "../Languages/LanguageHandler"; // Import 'useLanguage' and 't'
import CustomInput from "../componets/atoms/CustomInput";
import GlobalStyle from "../styles/GlobalStyle";
import BackButton from "../componets/BackButton";
import ErrorBanner from "./ErrorBanner";

const SignUpScreen = ({ navigation }) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("false"); // to check on password
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error msg");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(false);


  //To check on email
const onChangeEmailHandler = (text) => {
  onChangeEmail(text);
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if(formSubmitted) setEmailValid(emailPattern.test(text));
  };

  //To check on password
  const CheckPassword = (text) => {
    onChangePassword(text);
    if(formSubmitted)
      if(text.length >= 8 ) {
        setShowError(false);
        setEmailValid(true);
        setPasswordCheck(true); // it must be at least 8 chars
      }
    if(text.length < 8 ) {
      setShowError(false);
      setEmailValid(true);
      setPasswordCheck(false); // it must be at least 8 chars
    }
  };

  // Hide the banner when email or password is edited
  React.useEffect(() => {
    setShowError(false);
}, [email, password]);

  //Checks and navigates to Terms and Conditions
  const handleSubmit = () => {
    setFormSubmitted(true);
    // Check if email is empty
    if (email.trim() === "") {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(true);
      return; // Return early since email is a prerequisite for password check
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email) && email.trim()!=="") {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(true);
      return; // Return early since we need a valid email before checking password
    }

    // Check if password is empty only if email is valid
    if (password.trim() === "") {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields",currentLanguage)]);
      setPasswordCheck(false);
      setEmailValid(true);
      return; // Return early to ask for password input
    }

    // Validate password length
    if (password.length < 8 && password.trim()!=="") {
      setShowError(false);
      setErrorMessage("Error msg");
      setPasswordCheck(false);
      setEmailValid(true);
      return; // Return early since password needs to meet length requirement
    }

    // If all validations pass
    setShowError(false);
    navigation.navigate("TermsAndConditions", { email, password });
  };


  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={Backgroundstyle.informationScreens}>
      {showError && <ErrorBanner message={errorMessage} />}

      <View style={{ alignSelf: "stretch", paddingLeft: 25, paddingTop: 5 }}>
        <BackButton onPress={navigation.goBack}/>
      </View>
        <View style={GlobalStyle.BodyWrapper}>
      <Text style={[styles.Header_Primarycolor1,styles.Header]}>{t('SignUpScreen.Signup', currentLanguage)}</Text>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#8EA59E"
        value={email}
        onChangeText={onChangeEmailHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={[styles.inputBox, styles.inputBox, (!emailValid && formSubmitted) && SignUpStyles.errorInputBox]}
      />
      {!emailValid && formSubmitted ? <Text style={SignUpStyles.errorText}>{t("SignUpScreen.validemail", currentLanguage)}</Text> : null}

      <View style={[styles.inputBox , {flexDirection:"row"}, (!passwordCheck && formSubmitted) && SignUpStyles.errorInputBox]}>
      <TextInput
        value={password}
        onChangeText={CheckPassword}
        placeholder={t('SignUpScreen.password', currentLanguage)}
        placeholderTextColor="#8EA59E"
        keyboardType={'default'}
        secureTextEntry={!showPassword}
        style={{flex:1,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop:"auto",
          marginBottom:"auto",
          fontFamily: "space-grotesk",
          fontSize: 16,
          alignSelf: "stretch",}}
      />
      <Ionicons
        name={showPassword ? 'ios-eye-off' : 'ios-eye'}
        size={18}
        color={Primarycolor1}
        style={styles.Icon_container}
        onPress={togglePasswordVisibility}
      />
      </View>
          { (!passwordCheck && formSubmitted)  ?<Text style={[SignUpStyles.errorText, { marginLeft: 16,textAlign: "start" }]}> {t("SignUpScreen.passwordmsg", currentLanguage)}</Text>:null  }
      <Pressable onPress={handleSubmit} style={Buttons.main_button}>
            <Text style={Buttons.main_buttonText}>{t('SignUpScreen.Signup', currentLanguage)}</Text>
        </Pressable>

        <Pressable onPress={handleSubmit} style={Buttons.buttonfb}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}>
              {" "}
              Continue with Facebook
            </Text>
          </View>
        </Pressable>

        <Pressable onPress={handleSubmit} style={Buttons.buttongoogle}>
          <View style={SignUpStyles.container}>
            <Text style={Buttons.SocialMediabuttonText}>
              {" "}
              Continue with Google
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Sign in");
          }}
        >
          <Text style={styles.link}>
            {" "}
            {t("SignUpScreen.LogInLink", currentLanguage)}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const SignUpStyles = StyleSheet.create({
  text_Tertiary: {
    marginBottom: 10,
    color: "#07A0A2",
    textAlign: "center",
    fontSize: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#1c4b3d",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  errorInputBox: {
    borderColor: "#AA0000",
    borderWidth: 3,
    },
  errorText: {
    color: "#AA0000",
    fontSize: 12,
    marginTop: -10,
    marginBottom:13,
    textAlign: "center",
    }
});

export default SignUpScreen;
