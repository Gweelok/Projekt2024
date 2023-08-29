import React from "react";
import {View, Text,  TouchableOpacity} from "react-native";
import {HeaderText,} from "../../styles/Stylesheet";
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import {Ionicons} from "@expo/vector-icons";
import {GoBackButton} from "../../styles/GoBackButton";

const MyDrafts = () => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();

    const handlePress = () => {
        navigation.goBack();
    };

    return (
        <View>
        <View style={{flexDirection: "row", alignItems: "center", top:10, } }>
            <TouchableOpacity onPress={handlePress}>
                <Ionicons><GoBackButton/> </Ionicons>
            </TouchableOpacity>
            <Text style={[HeaderText.Header]}>
                {t("MyDraftsScreen.Header", currentLanguage)}
            </Text>
        </View>
            <Text>Here must be your text and data</Text>
        </View>
    );
};

export default MyDrafts;
