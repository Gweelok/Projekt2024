import React, { useState } from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {Feather} from "@expo/vector-icons";

import {Primarycolor1, Primarycolor4, styles } from "../styles/Stylesheet";
import { useLanguage, t } from '../Languages/LanguageHandler';

const SearchBox = ({ onChangeText, value, placeholderText }) => {
    const [isInputFocused, setIsInputFocused] = useState(false)
    const { currentLanguage } = useLanguage();

    const handleFocus = () => {
        setIsInputFocused(true);
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    return (
        <View style={styles1.inputContainer}>
            <TextInput
                style={styles1.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={t(placeholderText, currentLanguage)}
                placeholderTextColor={Primarycolor4}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <Feather 
                style={styles1.icon} 
                name="search" 
                size={22} 
                color={isInputFocused ? Primarycolor1 : Primarycolor4} 
            />
        </View>
    );
};

const styles1 = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Primarycolor1,
        paddingHorizontal: 10,
      },
      input: {
        borderRadius: 0,
        flex: 1,
        backgroundColor: "white",
        color: Primarycolor1,
      },
});

export default SearchBox;
