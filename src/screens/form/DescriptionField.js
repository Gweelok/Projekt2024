import {View, Text, TextInput } from 'react-native';
import React from 'react';
import { useLanguage, t } from '../../Languages/LanguageHandler';
import { Primarycolor1, Primarycolor3,} from "../../styles/Stylesheet";
import CustomInput from "../../componets/atoms/CustomInput";


const DescriptionField = () => {
    const { currentLanguage } = useLanguage();

    return (
        <View style={{marginTop: 20}}>

            <Text style={descriptionFieldStyles.dscLabel}> {t('DescriptionField.label', currentLanguage)}</Text>
            <CustomInput showStar={true} optionalMarginBottom>
            <TextInput
                style={descriptionFieldStyles.dscInput}
                multiline={true}
                clearButtonMode={"always"}
            />
                </CustomInput>
        </View>
    );
}

const descriptionFieldStyles = {
    dscLabel: {
        fontFamily: "space-grotesk-Medium",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        marginRight: 'auto'
    },
    dscInput: {
        alignItems: 'center',
        height: 100,
        fontFamily: "space-grotesk",
        borderWidth: 3,
        borderColor: Primarycolor1,
        backgroundColor: Primarycolor3,
        padding: 10,
    },
};

export default DescriptionField;



