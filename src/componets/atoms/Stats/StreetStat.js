import React from "react";
import { Text, View } from "react-native";
import { Buttons, Backgroundstyle, Primarycolor1, styles, Primarycolor2, Primarycolor3, Primarycolor4 } from "../../../styles/Stylesheet";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import { convertKgToTons } from "../../../utils/uptainersUtils";
import GlobalStyle from "../../../styles/GlobalStyle";

const StreetStat = (props) => {
    const { currentLanguage } = useLanguage();

    const uptainer = props.uptainer

    return (
        <View style={[GlobalStyle, { alignContent: "center", marginTop: 15 }]}>
            <Text style={[styles.paragraph_text, { fontSize: 19 }]}>{uptainer.uptainerName} </Text>
            <Text style={[styles.link, { textAlign: "left", marginTop: 5, textDecorationLine: "none" }]}>{uptainer.uptainerStreet} </Text>
            <View style={GlobalStyle}>
                <Text
                    style={[Backgroundstyle.message_Screens, { paddingTop: 9, height: 40, marginTop: 5, paddingLeft: 10, width: `${props.pos}%`, color: "white" }]}>
                    {uptainer.takenItems} {t('StatsPage.ItemsReused', currentLanguage)}
                </Text>
            </View>
            <View style={GlobalStyle}>
                <Text
                    style={[Backgroundstyle.informationScreens, { paddingTop: 9, height: 40, marginTop: 5, paddingLeft: 10, width: `${props.pos}%`, color: Primarycolor1 }]}>
                    {convertKgToTons(uptainer.savedCO2)}{t('StatsPage.CO2Save', currentLanguage)}
                </Text>

            </View>
        </View>
    );
};

export default StreetStat;
