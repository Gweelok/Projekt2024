import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import {t, useLanguage} from "../../Languages/LanguageHandler";
import {styles} from "../../styles/Stylesheet";


const AccountSettings = () => {
    const { currentLanguage } = useLanguage();
    return (
        <View>
            <Text style={[styles.Header]}>{t('AccountSettingsScreen.Header', currentLanguage)}</Text>

        </View>
    );
};

// Add prop validation
AccountSettings.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default AccountSettings;
