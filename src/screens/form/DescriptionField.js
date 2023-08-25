import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import { useLanguage, t } from '../../Languages/LanguageHandler';
import { AddStyles } from '../Add';
import { descriptionFieldStyles, Backgroundstyle } from "../../styles/Stylesheet";


const DescriptionField = ({ label }) => {
    const { currentLanguage } = useLanguage();

    return (
        <View style={Backgroundstyle.interactive_screens}>
        <Text style={descriptionFieldStyles.dscLabel}> {label} {t('DescriptionField.label', currentLanguage)}</Text>
            <TextInput
                style={descriptionFieldStyles.dscInput}
                multiline={true}
            ></TextInput>
        </View>
    );
}


export default DescriptionField;

