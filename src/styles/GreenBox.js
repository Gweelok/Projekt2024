import React from "react";
import { View, Text } from "react-native";
import { Backgroundstyle, HeaderText, styles } from "./Stylesheet";
import { t } from "../Languages/LanguageHandler";

export const GreenBox = ({
    msg,
    data,
}) => {
    return (
        <View
            style={[
                Backgroundstyle.informationScreens,
                { paddingTop: 0,margin:5 },
            ]}
        >
            <Text style={[styles.paragraph_text, { marginTop: 5, fontSize: 14 }]}>
                {msg}
            </Text>
            <Text style={[HeaderText.Header, { marginLeft: 0, marginTop: 10, fontSize: 35 }]}>
                {data}
            </Text>
        </View>
    );
};

export default GreenBox;
