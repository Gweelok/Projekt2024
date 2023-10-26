import GlobalStyle from "../../styles/GlobalStyle";
import {Pressable, Text, View,} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../styles/Stylesheet";
import React from "react";
import {BoxLink} from "../../styles/BoxLink";
import {AntDesign} from "@expo/vector-icons";
import {msg} from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage} from "../../Languages/LanguageHandler";

export const VisitedUptainerStat = ({navigation,route}) => {
    const { currentLanguage } = useLanguage();

    return(
        <View style={GlobalStyle}>
            <View>
                <View>
                    <Pressable >
                        <View style={styles.boxlink}>
                            <View style={GlobalStyle.BodyWrapper}>
                                <Text style={styles.menuItem_text}>COOP 365 </Text>
                                <Text style={styles.menuItem_text}>Norrebrogade 70, Horsens </Text>
                            </View>
                            <View style={styles.Icon_container}>
                                <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                            </View>
                        </View>
                    </Pressable>
                </View>
                <View style={GlobalStyle}>
                    <Text style={[Buttons.main_button,{paddingTop: 9, height:40, width: "100%", color:"white"}]}>5000 {t('StatsPage.ItemsReused', currentLanguage)}</Text>
                </View>
                <View style={GlobalStyle}>
                    <Text style={[Backgroundstyle.informationScreens,{paddingTop: 9, height:40, marginTop:5, marginBottom:40, paddingLeft:10, width: "100%", color:Primarycolor1}]}>40 t. {t('StatsPage.CO2Save', currentLanguage)}</Text>
                </View>
            </View>

            <View>
            <BoxLink msg={t('StatsPage.Info', currentLanguage)}  style={GlobalStyle.BodyWrapper}/>
            </View>
        </View>
    )
}
export default VisitedUptainerStat
