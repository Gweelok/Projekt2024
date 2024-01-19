import React, { useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import { useLanguage, t } from '../Languages/LanguageHandler';

import {Feather} from "@expo/vector-icons";

import {Primarycolor1, Primarycolor4} from "../styles/Stylesheet";


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
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={t(placeholderText, currentLanguage)}
                placeholderTextColor={Primarycolor4}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <Feather 
                name="search" 
                size={22} 
                color={isInputFocused ? Primarycolor1 : Primarycolor4}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
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


