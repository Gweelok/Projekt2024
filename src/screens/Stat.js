import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles, Backgroundstyle, HeaderText, Buttons } from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";
import ChartForStats from "../componets/atoms/ChartForStats";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon library
import StreetStat from "../componets/atoms/StreetStat";
import VisitedUptainerStat from "../componets/atoms/VisitedUptainerStat";
import Svg, { Path } from "react-native-svg";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";



const Stat = ({ navigation }) => {
    const { currentLanguage } = useLanguage();

    const handlePress = () => {
        navigation.goBack();
    };


    return (
        <View style={[Backgroundstyle.interactive_screens,{marginLeft: "4%", marginRight: "4%"}]}>
            <View style={{ flexDirection: "row", alignItems: "center", right: 70, }}>
                <BackButton onPress={handlePress} />
                <Text style={[HeaderText.Header]}>
                    <Text>{t("StatsPage.Header", currentLanguage)}</Text>
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity style={[Buttons.main_button, { width: 150, height: 41 }]}>
                        <Text style={Buttons.main_buttonText}>{t('StatsPage.MainButton', currentLanguage)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginRight: 10 }}>
                    <TouchableOpacity style={[Buttons.secondary_button, { width: 150, height: 41 }]}>
                        <Text style={Buttons.secondary_buttonText}>{t('StatsPage.SecondaryButton', currentLanguage)}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginTop: 20, right: 65 }}>
                <Text style={styles.article_text}>{t('StatsPage.AmountReduced', currentLanguage)}</Text>
            </View>

            <ScrollViewComponent>
                <View style={{ justifyContent: "space-between", marginTop: 20 }}>
                    <View style={GlobalStyle}>
                        <View style={{ flex: 1, }}>
                            <View style={[Backgroundstyle.informationScreens, { width: 330, paddingTop: 0 }]}>
                                <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 5 }]}>
                                    {t('StatsPage.SoFar', currentLanguage)}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[HeaderText.Header, GlobalStyle.BodyWrapper, { marginTop: 1 }]}>500000</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.article_text, GlobalStyle.BodyWrapper, { marginTop: -20, textAlign: 'center' }]}>
                                            {t('StatsPage.Yesterday', currentLanguage)}
                                        </Text>
                                        <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 1, textAlign: 'center' }]}>
                                            57t
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <View style={[Backgroundstyle.informationScreens, { width: 330, paddingTop: 0, }]}>
                                <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 5 }]}>
                                    {t('StatsPage.InTotal', currentLanguage)}
                                </Text>
                                <Text style={[HeaderText.Header, GlobalStyle.BodyWrapper, { marginTop: 1 }]}>500000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[GlobalStyle, { height: 285, }]}>
                        <ChartForStats />
                    </View>
                    <View style={{ marginTop: 2, marginBottom:20}}>
                        <Text style={styles.article_text}>{t('StatsPage.AmountCO2', currentLanguage)}</Text>
                    </View>
                    <View style={GlobalStyle}>
                        <View style={{ flex: 1, }}>
                            <View style={[Backgroundstyle.informationScreens, { width: 330, paddingTop: 0 }]}>
                                <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 5 }]}>
                                    {t('StatsPage.SoFar', currentLanguage)}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={[HeaderText.Header, GlobalStyle.BodyWrapper, { marginTop: 1 }]}>500000</Text>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={[styles.article_text, GlobalStyle.BodyWrapper, { marginTop: -20, textAlign: 'center' }]}>
                                            {t('StatsPage.Yesterday', currentLanguage)}
                                        </Text>
                                        <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 1, textAlign: 'center' }]}>
                                            57t
                                        </Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <View style={[Backgroundstyle.informationScreens, { width: 330, paddingTop: 0,   }]}>
                                <Text style={[styles.paragraph_text, GlobalStyle.BodyWrapper, { marginTop: 5 }]}>
                                    {t('StatsPage.InTotal', currentLanguage)}
                                </Text>
                                <Text style={[HeaderText.Header, GlobalStyle.BodyWrapper, { marginTop: 1 }]}>500000</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={[GlobalStyle,{ flexDirection: 'row', alignItems: 'center', marginTop:20, marginBottom:3,marginRight: "4%", }]}>
                            <LightbulbIcon />
                            <Text style={[styles.paragraph_text,{marginLeft:5}]}> {t('StatsPage.kgCO2', currentLanguage)}</Text>
                        </View>
                        <View style={[GlobalStyle,{ flexDirection: 'row', alignItems: 'center', marginTop:3, marginBottom:3,marginRight: "4%", }]}>
                            <LightbulbIcon />
                            <Text style={[styles.paragraph_text, {marginLeft:5}]}> {t('StatsPage.Amount', currentLanguage)} </Text>
                        </View>
                    </View>
                    <View style={[GlobalStyle,{alignContent:"center", marginTop:30}]}>
                        <Text style={styles.menuItem_text}>{t('StatsPage.BestAcheieve', currentLanguage)}</Text>
                    </View>
                    <StreetStat/>
                    <StreetStat/>
                    <StreetStat/>
                    <View style={[GlobalStyle,{alignContent:"center", marginTop:30}]}>
                        <Text style={[styles.menuItem_text, {marginBottom:10}]}>{t('StatsPage.MostVisitedUptainer', currentLanguage)}</Text>
                        <VisitedUptainerStat/>
                    </View>
                </View>
            </ScrollViewComponent>
            <Navigationbar navigation={navigation} />
        </View>
    );
}

export default Stat;
