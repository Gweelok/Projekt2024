import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

import { styles }  from '../../styles/Stylesheet';
import {t, useLanguage} from "../../Languages/LanguageHandler";

const CustomInput = ({ showStar, ...props }) => {
    const { currentLanguage, setLanguage } = useLanguage();

    return (
        <View style={customInputStyles.container}>
            <TextInput
                style={styles.inputBox}
                {...props}
            />
            {showStar && <Text style={customInputStyles.star}>{t("CustomInput.hint", currentLanguage)}</Text>}
        </View>
    );
};

const customInputStyles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'column',  // Changed from 'row' to 'column'
    },
    star: {
        paddingLeft:20,
        fontSize: 14,
        marginTop: -15,            // Optional: Add some margin at the top
        marginBottom:10,
    },
});

export default CustomInput;
