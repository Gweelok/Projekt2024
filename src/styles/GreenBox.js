import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {Backgroundstyle, HeaderText, styles} from "./Stylesheet";
import {t} from "../Languages/LanguageHandler";

export const GreenBox = ({ msg, data, secondMsg, secondData }) => {
    return (
            <View style={{ flex: 1, marginTop:10 }}>
                <View style={[Backgroundstyle.informationScreens, { paddingTop: 0,  width: '100%', paddingHorizontal:5 }]}>
                    <Text style={[styles.paragraph_text, { marginTop: 5,  width: '100%', paddingHorizontal:5 }]}>
                        {msg}
                    </Text>
                    <View style={{ flexDirection: "row", width: '100%', paddingHorizontal:5 }}>
                        <Text style={[HeaderText.Header, { marginTop: 1, }]}>{data}</Text>
                        <View style={{ alignItems: 'center', marginRight:15,  width: '100%', paddingHorizontal:5 }}>
                            <Text style={[styles.article_text, { marginTop: -20, textAlign: 'center', fontSize: 13, width: '100%' }]}>
                                {secondMsg}
                            </Text>

                            <Text style={[styles.paragraph_text, { marginTop: 10, textAlign: 'center', }]}>
                                {secondData}
                            </Text>
                        </View>

                    </View>
                </View>
        </View>
    );
};
export default GreenBox;
