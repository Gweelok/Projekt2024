import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Divider } from "react-native-elements";
import { t, useLanguage } from "../../languages/LanguageHandler";
import Icon from "react-native-vector-icons/AntDesign";

import MenuItems from "../../components/menu-items/MenuItems";

import accountSettingsStyle from "./accountSettingsStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";

import LanguageDropdown from "../../languages/language-dropdown/LanguageDropdown";
import ErrorBanner from "../../components/error-banner/ErrorBanner";
import CustomInput from "../../components/CustomInput/CustomInput";
import ScrollViewComponent from "../../components/ScrollViewComponent/ScrollViewComponent";
import BackButton from "../../components/BackButton/BackButton";
import { LoaderContext } from "../../contexts/LoaderContext/LoaderContext";

import { getCurrentUser, updateUserData } from "../../utils/Repo/Auth";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const AccountSettings = () => {
  const navigation = useNavigation();

  const { currentLanguage } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bannerErrorMessage, setbannerErrorMessage] = useState("");
  const [canSave, setcanSave] = useState(false);

  const { isLoading, setIsLoading } = useContext(LoaderContext);
  // using local Loading state instead of LoaderContext state to prevent re-execution of validate fields useEffect which relies on isLoading state
  const [isInit, setisInit] = useState(false);

  const [emailErrorMessage, setemailErrorMessage] = useState("");
  const [nameErrorMessage, setnameErrorMessage] = useState("");
  const [phoneErrorMessage, setphoneErrorMessage] = useState("");

  const handleBackPress = () => {
    navigation.navigate(Screens.MY_SETTINGS);
  };

  const checkFields = () => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d+$/;

    let isValid = true;

    if (email.trim() == "" || !emailPattern.test(email.trim())) {
      setemailErrorMessage(
        t("AccountSettingsScreen.InvalidEmail", currentLanguage)
      );
      isValid = false;
    } else {
      setemailErrorMessage();
    }

    if (name && (name.trim().length < 4 || !nameRegex.test(name.trim()))) {
      setnameErrorMessage(
        t("AccountSettingsScreen.InvalidName", currentLanguage)
      );
      isValid = false;
    } else {
      setnameErrorMessage();
    }

    if (phone && (phone.trim().length < 8 || !phoneRegex.test(phone))) {
      setphoneErrorMessage(
        t("AccountSettingsScreen.InvalidPhone", currentLanguage)
      );
      isValid = false;
    } else {
      setphoneErrorMessage();
    }

    return isValid;
  };

  // validate fields on changes
  useEffect(() => {
    if (isInit) {
      setcanSave(checkFields());
    }
  }, [name, email, phone]);

  // get realtime user data once component is mounted
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setisInit(true);
      })
      .catch(() => {
        navigation.navigate(Screens.MY_SETTINGS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSave = async () => {
    // disable save button and clear error message
    setIsLoading(true);
    setcanSave(false);
    setbannerErrorMessage("");

    // update auth + realtime user data
    updateUserData({ name: name, email: email, phone: phone })
      .then(() => {
        Alert.alert(
          "Success",
          t("AccountSettingsScreen.Saved", currentLanguage)
        );
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          setemailErrorMessage(
            t("AccountSettingsScreen.EmailExist", currentLanguage)
          );
          setbannerErrorMessage(
            t("AccountSettingsScreen.EmailExist", currentLanguage)
          );
        } else {
          setbannerErrorMessage(
            t("AccountSettingsScreen.Error", currentLanguage)
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  /* complete this task her */
  const handleDeleteAccount = () => {
    navigation.navigate(Screens.DELETE_ACCOUNT);
  };
  /* complete this task her */
  const handleChangePasswordPress = () => {
    navigation.navigate(Screens.CHANGE_PASSWORD);
  };

  return (
    <InteractiveScreen>
      <View style={accountSettingsStyle.header}>
        <BackButton onPress={handleBackPress}></BackButton>
        <Text style={accountSettingsStyle.headerText}>
          {t("AccountSettingsScreen.Header", currentLanguage)}{" "}
        </Text>
      </View>

      {bannerErrorMessage && <ErrorBanner message={bannerErrorMessage} />}

      <ScrollViewComponent>
        {/* Section 1 */}

        {/* Name */}
        <View style={accountSettingsStyle.nameInputContainer}>
          <Text style={accountSettingsStyle.nameLabel}>
            {t("AccountSettingsScreen.Name", currentLanguage)}
          </Text>

          <Text style={accountSettingsStyle.nameOptional}>
            ({t("AccountSettingsScreen.Optional", currentLanguage)})
          </Text>
        </View>

        <CustomInput>
          <TextInput
            placeholder="Jane Doe"
            placeholderTextColor={accountSettingsStyle.placeholderColor.color}
            value={name}
            onChangeText={setName}
            keyboardType="default"
            autoCapitalize="none"
            clearButtonMode={"always"}
            maxLength={30}
            style={[
              accountSettingsStyle.inputBox,
              nameErrorMessage && accountSettingsStyle.errorInputBox,
            ]}
          />
        </CustomInput>
        {nameErrorMessage && (
          <Text style={accountSettingsStyle.errorText}>{nameErrorMessage}</Text>
        )}

        {/* email */}
        <Text style={accountSettingsStyle.emailLabel}>
          {t("AccountSettingsScreen.Email", currentLanguage)}
        </Text>

        <CustomInput showStar={false}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="janedoe@example.com"
            placeholderTextColor={accountSettingsStyle.placeholderColor.color}
            keyboardType="email-address"
            autoCapitalize="none"
            clearButtonMode={"always"}
            maxLength={30}
            style={[
              accountSettingsStyle.inputBox,
              emailErrorMessage && accountSettingsStyle.errorInputBox,
            ]}
          />
        </CustomInput>
        {emailErrorMessage && (
          <Text style={accountSettingsStyle.errorText}>
            {emailErrorMessage}
          </Text>
        )}

        {/* phone */}
        <View style={accountSettingsStyle.phoneContainer}>
          <Text style={accountSettingsStyle.phoneLabel}>
            {t("AccountSettingsScreen.Tlf", currentLanguage)}
          </Text>

          <Text style={accountSettingsStyle.phoneOptional}>
            ({t("AccountSettingsScreen.Optional", currentLanguage)})
          </Text>
        </View>

        <CustomInput>
          <TextInput
            placeholder="00 00 00 00"
            placeholderTextColor={accountSettingsStyle.placeholderColor.color}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
            clearButtonMode={"always"}
            maxLength={20}
            style={[
              accountSettingsStyle.inputBox,
              phoneErrorMessage && accountSettingsStyle.errorInputBox,
            ]}
          />
        </CustomInput>
        {phoneErrorMessage && (
          <Text style={accountSettingsStyle.errorText}>
            {phoneErrorMessage}
          </Text>
        )}

        {/* Submit */}
        <TouchableOpacity
          disabled={!canSave}
          onPress={handleSave}
          style={[
            accountSettingsStyle.submitButton,
            !canSave && accountSettingsStyle.disableButton,
          ]}
        >
          <Text style={accountSettingsStyle.submitButtonText}>
            {t("AccountSettingsScreen.Submit", currentLanguage)}
          </Text>
        </TouchableOpacity>

        {/* Section 2 */}
        {/* ChangeCode */}
        <Divider style={accountSettingsStyle.divider}></Divider>
        <View>
          <MenuItems
            style={accountSettingsStyle.changeCodeText}
            msg={t("AccountSettingsScreen.ChangeCode", currentLanguage)}
            onPress={handleChangePasswordPress}
          />
        </View>

        {/* Section 3 */}
        {/* Language */}
        <Divider style={accountSettingsStyle.divider}></Divider>

        <View style={accountSettingsStyle.languageSelectorContainer}>
          <Text style={accountSettingsStyle.languageText}>
            {t("AccountSettingsScreen.Language", currentLanguage)}{" "}
          </Text>
          <LanguageDropdown />
        </View>

        <View style={accountSettingsStyle.deleteContainer}>
          <Pressable onPress={handleDeleteAccount}>
            <View style={accountSettingsStyle.iconContainer}>
              <Icon name="delete" style={[accountSettingsStyle.iconStyle]} />
              <Text style={accountSettingsStyle.deleteText}>
                {t("AccountSettingsScreen.Delete", currentLanguage)}
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollViewComponent>

    </InteractiveScreen>
  );
};

export default AccountSettings;
