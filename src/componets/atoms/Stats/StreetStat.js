import React from "react";
import { Text, View } from "react-native";
import {  Buttons, Backgroundstyle, Primarycolor1, styles, Primarycolor2, Primarycolor3, Primarycolor4 } from "../../../styles/Stylesheet";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import { convertKgToTons } from "../../../utils/uptainersUtils";
import GlobalStyle from "../../../styles/GlobalStyle";

const StreetStat = (props) => {
    const { currentLanguage } = useLanguage();

    const uptainer = props.uptainer

    return (
        <View style={{ backgroundColor: Primarycolor4, borderRadius: 10, margin: 5 }}>
            <View style={styles.boxlink}>
                <View style={GlobalStyle.BodyWrapper}>
                    <Text style={styles.menuItem_text}>{uptainer.uptainerName} </Text>
                    <Text style={[styles.menuItem_text, { fontFamily: "space-grotesk", fontSize: 15 }]}>
                        {uptainer.uptainerStreet}, {uptainer.uptainerCity}, {uptainer.uptainerZip}
                    </Text>
                </View>
            </View>



            <View style={{ marginBottom: 10 }}>
                <View>
                    <Text style={[Buttons.main_button, { marginTop: 0, borderWidth: 0, color: Primarycolor3 }]}>{uptainer["itemsReused"]} {t('StatsPage.ItemsReused', currentLanguage)}</Text>
                </View>
                <View>
                    <Text style={[Buttons.main_button, { marginTop: 0, borderWidth: 0, backgroundColor: Primarycolor2, color: Primarycolor1 }]}>{convertKgToTons(uptainer["savedCO2"])}{t('StatsPage.CO2Save', currentLanguage)}</Text>
                </View>
            </View>
        </View>
    );
};

export default StreetStat;
