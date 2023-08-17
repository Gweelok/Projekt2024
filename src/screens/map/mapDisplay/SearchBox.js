import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import {Primarycolor1} from "../../../styles/Stylesheet";
import {Feather} from "@expo/vector-icons";

const SearchBox = ({ onChangeText, value }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                onChangeText={onChangeText}
                value={value}
            />
            <Feather style={styles.searchIcon} name="search" size={24} color={Primarycolor1} />
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
