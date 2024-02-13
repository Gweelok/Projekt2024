import React from "react";
import { Text, View } from "react-native";
import { GlobalStyle, Buttons, Backgroundstyle, Primarycolor1, styles } from "../../../styles/Stylesheet";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import { convertKgToTons } from "../../../utils/uptainersUtils";

const StreetStat = ({ data, pos }) => {
    const { currentLanguage } = useLanguage();
    const uptainerName = data?.uptainerName;
    const uptainerLocation = data?.uptainerLocation;
    const itemsReused = data?.itemsReused;
    const Co2Savings = data?.savedCO2;
    return (
        <View style={[GlobalStyle, { alignContent: "center", marginTop: 15 }]}>
            <Text style={[styles.paragraph_text, { fontSize: 19 }]}>{uptainerName} </Text>
            <Text style={[styles.link, { textAlign: "left", marginTop: 5, textDecorationLine: "none" }]}>{uptainerLocation} </Text>
            <View style={GlobalStyle}>
                <View style={[Backgroundstyle.message_Screens, { paddingTop: 9, height: 40, marginTop: 5, paddingLeft: 10, width: `${pos}%`, color: "white" }]}>
                    <Text>{itemsReused} {t('StatsPage.ItemsReused', currentLanguage)}</Text>
                </View>
            </View>
            <View style={GlobalStyle}>
                <Text
                    style={[Backgroundstyle.informationScreens, { paddingTop: 9, height: 40, marginTop: 5, paddingLeft: 10, width: `${pos}%`, color: Primarycolor1 }]}>
                    {convertKgToTons(Co2Savings)}{t('StatsPage.CO2Save', currentLanguage)}
                </Text>
            </View>
        </View>
    );
};

export default StreetStat;
