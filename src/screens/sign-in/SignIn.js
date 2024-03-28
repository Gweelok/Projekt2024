import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { t, useLanguage } from "../../languages/LanguageHandler"; // or any other icon library you prefer
import { signInUser } from "../../utils/Repo/Auth"; //function to login, only needs email and password... returns a boolean

import InformationScreen from "../../templates/standardScreens/informationScreen";
import SignInStyles from "./signInStyles";

import ErrorBanner from "../../components/error-banner/ErrorBanner";
import BackButton from "../../components/BackButton/BackButton";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();
  
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(true); // to check on password
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error msg");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const { currentLanguage } = useLanguage();

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
  React.useEffect(() => {
    setShowError(false);
  }, [email, password]);

  //Check on both
  const handleSubmit = () => {
    setFormSubmitted(true);
    // Check if email is empty
    if (email.trim() === "") {
      setShowError(true);
      setErrorMessage([t("SignInScreen.fields", currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(true);
      return; // Return early since email is a prerequisite for password check
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email) && email.trim() !== "") {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(true);
      return; // Return early since we need a valid email before checking password
    }

    // Check if password is empty only if email is valid
    if (password.trim() === "") {
      setShowError(true);
      setErrorMessage([t("SignInScreen.fields", currentLanguage)]);
      setPasswordCheck(false);
      setEmailValid(true);
      return; // Return early to ask for password input
    }

    // Validate password length
    if (password.length < 8 && password.trim() !== "") {
      setShowError(true);
      setErrorMessage("Error msg");
      setPasswordCheck(false);
      setEmailValid(true);
      return; // Return early since password needs to meet length requirement
    }

    // If all validations pass
    setShowError(false);
    signInUser(email, password);
  };

  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  let Header = t("SignInScreen.Headline", currentLanguage);

  return (
    <InformationScreen>
      {showError && <ErrorBanner message={errorMessage} />}

      <View style={SignInStyles.backButtonContainer}>
        <BackButton onPress={navigation.goBack} />
      </View>

      <Text style={SignInStyles.logInHeader}>{Header}</Text>

      <TextInput
        placeholder="E-mail"
        placeholderTextColor={SignInStyles.placeholderTextColor.color}
        value={email}
        onChangeText={onChangeEmailHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={[
          SignInStyles.inputField,
          !emailValid && formSubmitted && SignInStyles.errorInputBox,
        ]}
      />
      {!emailValid && formSubmitted && (
        <Text style={SignInStyles.errorText}>
          {t("SignInScreen.validemail", currentLanguage)}
        </Text>
      )}

      <View
        style={[
          SignInStyles.inputField,
          !passwordCheck && formSubmitted && SignInStyles.errorInputBox,
        ]}
      >
        <TextInput
          value={password}
          onChangeText={CheckPassword}
          placeholder={`${t("SignUpScreen.password", currentLanguage)}`}
          placeholderTextColor={SignInStyles.placeholderTextColor.color}
          keyboardType={"default"}
          secureTextEntry={!showPassword}
          style={SignInStyles.inputText}
        />
        <Ionicons
          name={showPassword ? "ios-eye-off" : "ios-eye"}
          style={SignInStyles.eyeIcon}
          onPress={togglePasswordVisibility}
        />
      </View>

      {
        //Check on the password
        !passwordCheck && formSubmitted ? (
          <Text style={SignInStyles.errorText}>
            {t("SignInScreen.passwordmsg", currentLanguage)}
          </Text>
        ) : null
      }

      <Pressable onPress={handleSubmit} style={SignInStyles.submitButton}>
        <Text style={SignInStyles.submitButtonText}>{Header}</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate(Screens.FORGOT_PASSWORD)}>
        <Text style={SignInStyles.forgetPassLink}>
          {t("SignInScreen.ForgetPwHint", currentLanguage)}
        </Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={SignInStyles.fbButton}>
        <View style={SignInStyles.container}>
          <Text style={SignInStyles.socialText}> Continue with Facebook</Text>
        </View>
      </Pressable>

      <Pressable onPress={handleSubmit} style={SignInStyles.googleButton}>
        <View style={SignInStyles.container}>
          <Text style={SignInStyles.socialText}> Continue with Google</Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate(Screens.SIGN_UP);
        }}
      >
        <Text style={SignInStyles.signUpLink}>
          {t("SignInScreen.SignUpHint", currentLanguage)}
        </Text>
      </Pressable>
    </InformationScreen>
  );
};

export default SignIn;
