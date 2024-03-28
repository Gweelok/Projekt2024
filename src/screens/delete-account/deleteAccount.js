import { Text, View, TouchableOpacity } from "react-native";
import React from "react";

import Screens from "../../utils/ScreenPaths";
import { t, useLanguage } from "../../languages/LanguageHandler";

import deleteAccountStyles from "./deleteAccountStyles";
import InteractiveScreen from "../../templates/standardScreens/interactiveScreen";
import { useNavigation } from "@react-navigation/native";

// eslint-disable-next-line react/prop-types
const DeleteAccount = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();
    const deleteacount = () => {
        // What should happen, when pressing this is defined under 'backend
    };
    const BackToAccountSettings = () => {
        // eslint-disable-next-line react/prop-types
        navigation.navigate(Screens.ACCOUNT_SETTINGS);
    };

    return (

        <InteractiveScreen>

            <Text style={deleteAccountStyles.header}>{t('DeleteAccount.Header', currentLanguage)} </Text>

            <View >
                <TouchableOpacity style={deleteAccountStyles.deleteButton} onPress={deleteacount}>
                    <Text style={deleteAccountStyles.deleteButtonText}> {t('DeleteAccount.MainButton', currentLanguage)}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={deleteAccountStyles.cancelButton} onPress={BackToAccountSettings}>
                <Text style={deleteAccountStyles.cancelButtonText}>   {t('DeleteAccount.SecondaryButton', currentLanguage)}</Text>
            </TouchableOpacity>

        </InteractiveScreen>
    );
}

export default DeleteAccount;