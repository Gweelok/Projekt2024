import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';  // Import useState
import { useLanguage, t } from '../../../languages/LanguageHandler';

import descriptionFieldStyles from "./descriptionFieldStyles";

import CustomInput from "../../CustomInput/CustomInput";

const DescriptionField = ({ onInputComplete, data = '' }) => {
  const { currentLanguage } = useLanguage();
  const [inputValue, setInputValue] = useState(data); // Create a state to store the input value

  return (
    <View style={{ marginTop: 5 }}>

      <View style={{ flexDirection: "row", alignItems: "center" }}>

        <Text style={descriptionFieldStyles.formLabel}>
          {t("DescriptionField.label", currentLanguage)}
        </Text>

        <Text style={descriptionFieldStyles.optionalText}>
          ({t("AccountSettingsScreen.Optional", currentLanguage)})
        </Text>

      </View>

      <CustomInput optionalMarginBottom>
        <TextInput
          style={descriptionFieldStyles.dscInput}
          placeholder={t("DescriptionField.placeholder", currentLanguage)}
          placeholderTextColor={descriptionFieldStyles.placeholdercolor}
          multiline={true}
          defaultValue={data}
          onChangeText={text => setInputValue(text)}  // Update the state with the input value
          onEndEditing={() => onInputComplete && onInputComplete(inputValue)}  // Call the provided function with the input value
          textAlignVertical={descriptionFieldStyles.dscInput.textAlignVertical}
        />
      </CustomInput>

    </View>
  );
}

export default DescriptionField;
