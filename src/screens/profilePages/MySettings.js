import React from 'react';
import { View, Text,} from 'react-native';
import PropTypes from 'prop-types';
import { t, useLanguage } from '../../Languages/LanguageHandler';
import {styles} from "../../styles/Stylesheet";
import {MenuItems} from "../../styles/MenuItems";

const MYSETTINGSSCREEN = {
    AccountSettings: 'AccountSettings',
    Notifications: 'Notifications',
    ChangePassword: 'ChangePassword',
};

const MySettings = ({ navigation }) => {
    const { currentLanguage } = useLanguage(); // Move the hook inside the functional component

    const handlePress = (selectedOption) => {
        if (selectedOption === MYSETTINGSSCREEN.AccountSettings) {
            navigation.navigate('AccountSettings');
        } else if (selectedOption === MYSETTINGSSCREEN.Notifications) {
            navigation.navigate('Notifications');
        } else if (selectedOption === MYSETTINGSSCREEN.ChangePassword) {
            navigation.navigate('ChangePassword');
        }
    };

    return (
        <View>
            <Text style={[styles.Header]}>{t('MySettingsScreen.Header', currentLanguage)}</Text>
            <MenuItems msg={t('AccountSettingsScreen.Header', currentLanguage)} onPress={() => handlePress(MYSETTINGSSCREEN.AccountSettings)} />
            <MenuItems msg={t('NotificationsScreen.Header', currentLanguage)} onPress={() => handlePress(MYSETTINGSSCREEN.Notifications)} />
        </View>
    );
};

// Add prop validation
MySettings.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default MySettings;
