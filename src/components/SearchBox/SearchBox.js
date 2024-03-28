import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useLanguage, t } from "../../languages/LanguageHandler";
import { Feather } from "@expo/vector-icons";
import searchBoxStyles from "./searchBoxStyles";

const SearchBox = ({ onChangeText, value, placeholderText }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { currentLanguage } = useLanguage();
  const handleFocus = () => {
    setIsInputFocused(true);
  };
  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <View style={searchBoxStyles.inputContainer}>
      <TextInput
        style={searchBoxStyles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={t(placeholderText, currentLanguage)}
        placeholderTextColor={searchBoxStyles.placeholderText.color}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Feather
        name="search"
        size={searchBoxStyles.feather.size}
        color={
          isInputFocused
            ? searchBoxStyles.feather.color
            : searchBoxStyles.feather.fallbackColor
        }
      />
    </View>
  );
};

export default SearchBox;
