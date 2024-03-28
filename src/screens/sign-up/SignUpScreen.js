import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import InformationScreen from "../../templates/standardScreens/informationScreen";
import SignUpStyles from "./signUpStyles";

import { Ionicons } from "@expo/vector-icons"; // or any other icon library you prefer
import { useLanguage, t } from "../../languages/LanguageHandler"; // Import 'useLanguage' and 't'
import BackButton from "../../components/BackButton/BackButton";
import ErrorBanner from "../../components/error-banner/ErrorBanner";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  // State variables using React Hooks
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("false"); // to check on password
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error msg");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // Function to handle changes in the email input
  const onChangeEmailHandler = (text) => {
    onChangeEmail(text);
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (formSubmitted)
      if (emailPattern.test(text)) {
        setShowError(false);
        setEmailValid(true);
        return;
      }
    if (!emailPattern.test(text)) {
      setShowError(false);
      setEmailValid(false);
      return;
    }
  };
  // Function to check password and update state
  const CheckPassword = (text) => {
    onChangePassword(text);
    if (formSubmitted)
      if (text.length >= 8) {
        setShowError(false);
        setPasswordCheck(true);
        return;
      }
    if (text.length < 8) {
      setShowError(false);
      setPasswordCheck(false);
      return;
    }
  };

  // useEffect hook to reset error state on email or password change
  React.useEffect(() => {
    setShowError(false);
  }, [email, password]);

  // Function to handle form submission and Checks and navigates to Terms and Conditions
  const handleSubmit = () => {
    setFormSubmitted(true);
    // Check if email and password is empty
    if (email.trim() === "" && password.trim() === "") {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields", currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is empty, and password is not empty
    if (email.trim() === "" && password.trim() !== "" && password.length < 8) {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields", currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // Check if email is not empty, and password is empty
    if (
      !emailPattern.test(email) &&
      email.trim() !== "" &&
      password.trim() === ""
    ) {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is not empty, and password is not empty and number of characters are less than 8
    if (
      !emailPattern.test(email) &&
      email.trim() !== "" &&
      password.length < 8 &&
      password.trim() !== ""
    ) {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(false);
      return;
    }
    // Check if email is not empty, and password is not empty and number of characters are bigger or equal than 8
    if (
      !emailPattern.test(email) &&
      email.trim() !== "" &&
      password.length >= 8 &&
      password.trim() !== ""
    ) {
      setShowError(true);
      setErrorMessage("Error msg");
      setEmailValid(false);
      setPasswordCheck(true);
      return;
    }
    // Check if email is empty, and password is not empty and number of characters are bigger or equal than 8
    if (
      !emailPattern.test(email) &&
      email.trim() === "" &&
      password.length >= 8 &&
      password.trim() !== ""
    ) {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields", currentLanguage)]);
      setEmailValid(false);
      setPasswordCheck(true);
      return;
    }
    if (
      emailPattern.test(email) &&
      email.trim() !== "" &&
      password.trim() === ""
    ) {
      setShowError(true);
      setErrorMessage([t("SignUpScreen.fields", currentLanguage)]);
      setEmailValid(true);
      setPasswordCheck(false);
      return;
    }

    if (
      emailPattern.test(email) &&
      email.trim() !== "" &&
      password.length < 8 &&
      password.trim() !== ""
    ) {
      setShowError(false);
      setErrorMessage("Error msg");
      setPasswordCheck(false);
      setEmailValid(true);
      return;
    }
    if (
      emailPattern.test(email) &&
      email.trim() !== "" &&
      password.length >= 8 &&
      password.trim() !== ""
    ) {
      setShowError(false);
      setErrorMessage("Error msg");
      setEmailValid(true);
      setPasswordCheck(true);
      return navigation.navigate(Screens.TERMS_AND_CONDITIONS, {
        email,
        password,
      }); // Return early since we need a valid email before checking password
    }
    /* // If all validations pass
     setShowError(false);
     navigation.navigate("TermsAndConditions", { email, password });*/
  };

  // Function to render error or helper text based on form submission and password check
  const renderMessage = () => {
    // If the form has not been submitted yet, show a helper text
    if (!formSubmitted) {
      return (
        <Text style={SignUpStyles.helperText}>
          {t("SignUpScreen.passwordmsgUP", currentLanguage)}
        </Text>
      );
    }
    // If the form has been submitted and the password is invalid, show an error text
    else if (formSubmitted && !passwordCheck) {
      return (
        <Text style={SignUpStyles.errorText}>
          {t("SignUpScreen.passwordmsgUP", currentLanguage)}
        </Text>
      );
    }
    // If the password is valid, show a helper text
    else if (passwordCheck) {
      return (
        <Text style={SignUpStyles.helperText}>
          {t("SignUpScreen.passwordmsgUP", currentLanguage)}
        </Text>
      );
    }
    // Default case, show a helper text
    else {
      return (
        <Text style={SignUpStyles.helperText}>
          {t("SignUpScreen.passwordmsgUP", currentLanguage)}
        </Text>
      );
    }
  };

  //check if pass should be shown
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <InformationScreen>
      {showError && <ErrorBanner message={errorMessage} />}

      <View style={SignUpStyles.backButtonContainer}>
        <BackButton onPress={navigation.goBack} />
      </View>
      {/*Back button outside of view????*/}

      <Text style={SignUpStyles.signUpHeader}>
        {t("SignUpScreen.Signup", currentLanguage)}
      </Text>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor={SignUpStyles.placeholderColor.color}
        value={email}
        onChangeText={onChangeEmailHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        clearButtonMode={"always"}
        style={[
          SignUpStyles.inputField,
          !emailValid && formSubmitted && SignUpStyles.errorInputBox,
        ]}
      />
      {!emailValid && formSubmitted ? (
        <Text style={SignUpStyles.errorText}>
          {t("SignUpScreen.validemail", currentLanguage)}
        </Text>
      ) : null}

      <View
        style={[
          SignUpStyles.inputField,
          !passwordCheck && formSubmitted && SignUpStyles.errorInputBox,
        ]}
      >
        <TextInput
          value={password}
          onChangeText={CheckPassword}
          placeholder={t("SignUpScreen.password", currentLanguage)}
          placeholderTextColor={SignUpStyles.placeholderColor.color}
          keyboardType={"default"}
          secureTextEntry={!showPassword}
          style={SignUpStyles.textInput}
        />
        <Ionicons
          name={showPassword ? "ios-eye-off" : "ios-eye"}
          style={SignUpStyles.eyeIcon}
          onPress={togglePasswordVisibility}
        />
      </View>

      {renderMessage()}

      <Pressable onPress={handleSubmit} style={SignUpStyles.submitButton}>
        <Text style={SignUpStyles.submitButtonText}>
          {t("SignUpScreen.Signup", currentLanguage)}
        </Text>
      </Pressable>

      <Pressable onPress={handleSubmit} style={SignUpStyles.fbButton}>
        <View style={SignUpStyles.container}>
          <Text style={SignUpStyles.socialButtonText}>
            {" "}
            Continue with Facebook
          </Text>
        </View>
      </Pressable>

      <Pressable onPress={handleSubmit} style={SignUpStyles.googleButton}>
        <View style={SignUpStyles.container}>
          <Text style={SignUpStyles.socialButtonText}>
            {" "}
            Continue with Google
          </Text>
        </View>
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate(Screens.SIGN_IN);
        }}
      >
        <Text style={SignUpStyles.signInLink}>
          {" "}
          {t("SignUpScreen.LogInLink", currentLanguage)}
        </Text>
      </Pressable>
    </InformationScreen>
  );
};

export default SignUpScreen;
