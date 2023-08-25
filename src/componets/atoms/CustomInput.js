import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {t, useLanguage} from "../../Languages/LanguageHandler";

const CustomInput = ({children, showStar}) => {
  const {currentLanguage} = useLanguage();

  return (
    <View style={customInputStyles.container}>
      {children}
      {showStar && <Text style={customInputStyles.star}>{t("CustomInput.hint", currentLanguage)}</Text>}
    </View>
  );
};

const customInputStyles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'column',
  },
  star: {
    paddingLeft: 20,
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
  },
});

export default CustomInput;
