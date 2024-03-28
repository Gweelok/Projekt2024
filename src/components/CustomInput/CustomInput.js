import React from "react";
import { View, Text } from "react-native";
import { t, useLanguage } from "../../languages/LanguageHandler";
import customInputStyles from "./customInputStyles";

// This component is used to wrap the input component and show the hint text "optional"
// you need to set whether show the hint by passing the prop "showStar"
// you can also set the margin of the hint text by passing the prop "optionalMarginXXX".
// You can also set the font size of the hint text by passing the prop "optionalFontSize".

const CustomInput = ({
  children,
  showStar,
  optionalMarginTop,
  optionalMarginLeft,
  optionalFontSize,
  optionalMarginBottom,
}) => {
  const { currentLanguage } = useLanguage();
  const dynamicHintTextStyle = {
    ...(optionalFontSize !== undefined && { fontSize: optionalFontSize }),
    ...(optionalMarginTop !== undefined && { marginTop: optionalMarginTop }),
    ...(optionalMarginLeft !== undefined && { marginLeft: optionalMarginLeft }),
    ...(optionalMarginBottom !== undefined && {
      marginBottom: optionalMarginBottom,
    }),
  };

  return (
    <View style={customInputStyles.container}>
      {children}
      {showStar && (
        <Text style={[customInputStyles.hintText, dynamicHintTextStyle]}>
          {t("CustomInput.hint", currentLanguage)}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
