import GlobalStyle from "../../styles/GlobalStyle";
import {Text, View,} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../styles/Stylesheet";
import React from "react";
import { t, useLanguage} from "../../Languages/LanguageHandler";

export const StreetStat = ({navigation,route}) => {
    const { currentLanguage } = useLanguage();


    return(
    <View style={[GlobalStyle, {alignContent: "center", marginTop: 15}]}>
        <Text style={[styles.paragraph_text,{fontSize: 19}]}>KU Lighthouse</Text>
        <Text style={[styles.link,{textAlign: "left", marginTop:5, textDecorationLine: "none",}]}>Norrebrogade 70, Horsens</Text>
        <View style={GlobalStyle}>
            <Text style={[Buttons.main_button,{paddingTop: 9, height:40, marginTop:10, width: "100%", color:"white"}]}>5000 {t('StatsPage.ItemsReused', currentLanguage)}</Text>
        </View>
        <View style={GlobalStyle}>
        <Text style={[Backgroundstyle.informationScreens,{paddingTop: 9, height:40, marginTop:5, paddingLeft:10, width: "100%", color:Primarycolor1}]}>40 t. {t('StatsPage.CO2Save', currentLanguage)}</Text>
        </View>
    </View>
)
}
export default StreetStat
