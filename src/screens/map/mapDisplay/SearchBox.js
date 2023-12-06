import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Primarycolor1, Primarycolor4} from "../../../styles/Stylesheet";
import {Feather} from "@expo/vector-icons";
import { useLanguage, t } from '../../../Languages/LanguageHandler';

const SearchBox = ({ onChangeText, value }) => {
    const { currentLanguage } = useLanguage();
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                placeholder={t('SearchField.placeholder', currentLanguage)}
                placeholderTextColor={Primarycolor4}
            />
            <Feather style={styles.searchIcon} name="search" size={24} color={Primarycolor4} />
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
    container: {
        marginTop: 50,
        width:  Dimensions.get('window').width * 0.85,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: Primarycolor1,
        borderWidth: 3,
        paddingHorizontal: 10,
    },
});

export default SearchBox;
