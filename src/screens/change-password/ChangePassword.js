import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";

import { Ionicons } from "@expo/vector-icons";
import ErrorBanner from "../../components/error-banner/ErrorBanner";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";
import BackButton from "../../components/BackButton/BackButton";

import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import changePasswordStyles from "./changePasswordStyles";

import { SecureStorage } from "../../utils/SecureStorage";
import { updateUserData } from "../../utils/Repo/Auth";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const ChangePassword = () => {
  const navigation = useNavigation();
  const { currentLanguage } = useLanguage();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordErrorMessage, setcurrentPasswordErrorMessage] =
    useState("");
  const [newPasswordErrorMessage, setnewPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setconfirmPasswordErrorMessage] =
    useState("");

  const [canSave, setcanSave] = useState(false);
  const [isInit, setisInit] = useState(false);
  const [bannerErrorMessage, setbannerErrorMessage] = useState("");
  const { isLoading, setIsLoading } = useContext(LoaderContext);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlePress = async () => {
    setIsLoading(true);
    setcanSave(false);
    setbannerErrorMessage("");

    const oldPassword = await SecureStorage.getPassword();

    if (currentPassword != oldPassword) {
      setbannerErrorMessage(
        t("ChangePasswordScreen.CurrentPasswordMatchError", currentLanguage)
      );
      setcurrentPasswordErrorMessage(
        t("ChangePasswordScreen.CurrentPasswordMatchError", currentLanguage)
      );
      setIsLoading(false);
    } else if (currentPassword == newPassword) {
      setbannerErrorMessage(
        t("ChangePasswordScreen.PasswordMatchError", currentLanguage)
      );
      setnewPasswordErrorMessage(
        t("ChangePasswordScreen.PasswordMatchError", currentLanguage)
      );
      setIsLoading(false);
    } else {
      updateUserData({ password: newPassword })
        .then(() => {
          Alert.alert(
            "Success",
            t("ChangePasswordScreen.PasswordChanged", currentLanguage)
          );
          handleBackPress();
        })
        .catch(() => {
          setbannerErrorMessage(
            t("ChangePasswordScreen.PasswordUpdateError", currentLanguage)
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleBackPress = () => {
    // reset values when navigating back (component won't be unmounted)
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setisInit(false);
    navigation.navigate(Screens.ACCOUNT_SETTINGS);
  };

  const checkFields = () => {
    let isValid = true;

    if (currentPassword) {
      if (currentPassword.trim() == "" || currentPassword.trim().length < 8) {
        setcurrentPasswordErrorMessage(
          t("ChangePasswordScreen.PasswordLengthError", currentLanguage)
        );
        isValid = false;
      } else {
        setcurrentPasswordErrorMessage();
      }
    } else {
      isValid = false;
    }

    if (newPassword) {
      if (newPassword.trim().length < 8) {
        setnewPasswordErrorMessage(
          t("ChangePasswordScreen.PasswordLengthError", currentLanguage)
        );
        isValid = false;
      } else {
        setnewPasswordErrorMessage();
      }
    } else {
      isValid = false;
    }

    if (confirmPassword) {
      if (confirmPassword.trim() != newPassword.trim()) {
        setconfirmPasswordErrorMessage(
          t("ChangePasswordScreen.PasswordMismatchError", currentLanguage)
        );
        isValid = false;
      } else {
        setconfirmPasswordErrorMessage();
      }
    } else {
      isValid = false;
    }

    return isValid;
  };

  // validate fields once initialized
  useEffect(() => {
    if (isInit) {
      setcanSave(checkFields());
    } else {
      setisInit(true);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <InteractiveScreen>
      <View style={changePasswordStyles.header}>
        <BackButton onPress={handleBackPress}></BackButton>
        <Text style={changePasswordStyles.headerText}>
          {t("AccountSettingsScreen.ChangeCode", currentLanguage)}{" "}
        </Text>
      </View>

      {bannerErrorMessage && <ErrorBanner message={bannerErrorMessage} />}

      {/* Current password */}
      <Text style={changePasswordStyles.inputFieldLabel}>
        {t("ChangePasswordScreen.CurrentPassword", currentLanguage)}
      </Text>
      <View
        style={[
          changePasswordStyles.inputbox,
          currentPasswordErrorMessage && changePasswordStyles.errorInputBox,
        ]}
      >
        <View style={changePasswordStyles.inputContainer}>
          <TextInput
            style={changePasswordStyles.inputText}
            secureTextEntry={!showPassword["currentPassword"]}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder={t(
              "ChangePasswordScreen.CurrentPassword",
              currentLanguage
            )}
            placeholderTextColor={
              changePasswordStyles.placeholderTextColor.color
            }
            keyboardType="default"
            autoCapitalize="none"
            maxLength={30}
          />

          <Ionicons
            name={showPassword["currentPassword"] ? "ios-eye-off" : "ios-eye"}
            style={changePasswordStyles.eyeIcon}
            onPress={() => {
              togglePasswordVisibility("currentPassword");
            }}
          />
        </View>
      </View>
      {currentPasswordErrorMessage && (
        <Text style={changePasswordStyles.errorText}>
          {currentPasswordErrorMessage}
        </Text>
      )}

      {/* New password */}
      <Text style={changePasswordStyles.inputFieldLabel}>
        {t("ChangePasswordScreen.NewPassword", currentLanguage)}
      </Text>
      <View
        style={[
          changePasswordStyles.inputbox,
          newPasswordErrorMessage && changePasswordStyles.errorInputBox,
        ]}
      >
        <View style={changePasswordStyles.inputContainer}>
          <TextInput
            style={changePasswordStyles.inputText}
            secureTextEntry={!showPassword["newPassword"]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={t("ChangePasswordScreen.NewPassword", currentLanguage)}
            placeholderTextColor={
              changePasswordStyles.placeholderTextColor.color
            }
            keyboardType="default"
            autoCapitalize="none"
            maxLength={30}
          />
          <Ionicons
            name={showPassword["newPassword"] ? "ios-eye-off" : "ios-eye"}
            style={changePasswordStyles.eyeIcon}
            onPress={() => {
              togglePasswordVisibility("newPassword");
            }}
          />
        </View>
      </View>
      {newPasswordErrorMessage && (
        <Text style={changePasswordStyles.errorText}>
          {newPasswordErrorMessage}
        </Text>
      )}

      {/* Confirm password */}
      <Text style={changePasswordStyles.inputFieldLabel}>
        {t("ChangePasswordScreen.ConfirmPassword", currentLanguage)}
      </Text>
      <View
        style={[
          changePasswordStyles.inputbox,
          { flexdirection: "row" },
          confirmPasswordErrorMessage && changePasswordStyles.errorInputBox,
        ]}
      >
        <View style={changePasswordStyles.inputContainer}>
          <TextInput
            style={changePasswordStyles.inputText}
            secureTextEntry={!showPassword["confirmPassword"]}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={t(
              "ChangePasswordScreen.ConfirmPassword",
              currentLanguage
            )}
            placeholderTextColor={
              changePasswordStyles.placeholderTextColor.color
            }
            keyboardType="default"
            autoCapitalize="none"
            maxLength={30}
          />
          <Ionicons
            name={showPassword["confirmPassword"] ? "ios-eye-off" : "ios-eye"}
            style={changePasswordStyles.eyeIcon}
            onPress={() => {
              togglePasswordVisibility("confirmPassword");
            }}
          />
        </View>
      </View>
      {confirmPasswordErrorMessage && (
        <Text style={changePasswordStyles.errorText}>
          {confirmPasswordErrorMessage}
        </Text>
      )}

      <TouchableOpacity
        disabled={!canSave}
        style={[
          changePasswordStyles.saveButton,
          !canSave && changePasswordStyles.disabledButton,
        ]}
        onPress={handlePress}
      >
        <View>
          <Text style={changePasswordStyles.saveButtonText}>
            {t("ChangePasswordScreen.SavePassword", currentLanguage)}
          </Text>
        </View>
      </TouchableOpacity>

    </InteractiveScreen>
  );
};

export default ChangePassword;
