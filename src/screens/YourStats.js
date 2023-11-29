import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { t, useLanguage } from "../Languages/LanguageHandler";
import { Backgroundstyle, HeaderText, Primarycolor1, styles } from "../styles/Stylesheet";
import ScrollViewComponent from "../componets/atoms/ScrollViewComponent";
import GlobalStyle from "../styles/GlobalStyle";
import { useNavigation } from "@react-navigation/native";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import Icon from 'react-native-vector-icons/FontAwesome'; // for Facebook
import Icon2 from 'react-native-vector-icons/FontAwesome';
import YourVisitedUptainer from "../componets/atoms/Stats/YourVisitedUptainer";
import ArticleSlider from "./article/ArticleSlider";
import GreenBox from "../styles/GreenBox";

const YourStats = () => {
    const { currentLanguage } = useLanguage();
    const navigation = useNavigation();

    return (
        <ScrollViewComponent>
            <View>
                <View style={{ marginTop: 25, marginBottom: 10,}}>
                    <Text style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}>{t('StatsPage.AmountReduced', currentLanguage)}</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10}}>
                    <View style={[Backgroundstyle.informationScreens, {  paddingTop: 5, marginRight: 15,  }]}>
                        <Text style={[styles.paragraph_text,  { marginTop: 5, fontSize: 14 }]}>{t('StatsPage.ItemsDonated', currentLanguage)}</Text>
                        <Text style={[HeaderText.Header, { marginTop: 10, fontSize: 35 }]}>5</Text>
                    </View>
                    <View style={[Backgroundstyle.informationScreens, { paddingTop: 5,  }]}>
                        <Text style={[styles.paragraph_text, { marginTop: 5, fontSize: 14 }]}>{t('StatsPage.ItemsCollected', currentLanguage)}</Text>
                        <Text style={[HeaderText.Header, { marginTop: 10, fontSize: 35 }]}>7</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MyDrafts')}>
                        <Text style={styles.link}>{t('StatsPage.Overview', currentLanguage)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginBottom: 20, }}>
                    <Text style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}>{t('StatsPage.AmountCO2', currentLanguage)}</Text>
                </View>
                <View style={{marginTop:0,}}>
                    <GreenBox data={"960 kg."} textStyle={{ marginTop:20, marginBottom:-5,height:20 }} />

                </View>
                <View>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginTop:20, marginBottom:3,marginRight: "4%", }]}>
                        <LightbulbIcon />
                        <Text style={[styles.paragraph_text,{marginLeft:5}]}> {t('StatsPage.kgCO2', currentLanguage)}</Text>
                    </View>
                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginTop:3, marginBottom:3,marginRight: "4%", }]}>
                        <LightbulbIcon />
                        <Text style={[styles.paragraph_text, {marginLeft:5}]}> {t('StatsPage.Amount', currentLanguage)} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20 }}>
                    <View style={[ { flexDirection: 'row', alignItems: 'center', marginTop: 3, marginBottom: 3, marginRight: "4%" }]}>
                        <View style={{ backgroundColor: Primarycolor1, alignItems: 'center', borderRadius: 3, padding: 4, height: 35, width: 35 }}>
                            <TouchableOpacity>
                                <Icon name="facebook" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[{ flexDirection: 'row', alignItems: 'center', marginTop: 3, marginBottom: 3, marginRight: "4%" }]}>
                        <View style={{ backgroundColor: Primarycolor1, alignItems: 'center', borderRadius: 3, padding: 2, height: 35, width: 35 }}>
                            <TouchableOpacity>
                                <Icon2 name="instagram" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 10, alignItems: "center" }}>
                    <Text style={[styles.paragraph_text, { fontSize: 14, }]}>{t('StatsPage.Social', currentLanguage)} </Text>
                </View>
                <View>
                    <View style={{ backgroundColor: Primarycolor1, height: 3, marginTop: 40, marginBottom: 30 }} />
                </View>
                <View style={[ { alignContent: "center", }]}>
                    <Text style={[styles.menuItem_text, { marginBottom: 20 }]}>{t('StatsPage.MostVisitedUptainer', currentLanguage)}</Text>
                </View>
                <YourVisitedUptainer />
                <YourVisitedUptainer />
                <YourVisitedUptainer />
                <View style={{ marginTop: 25, marginBottom: 10, }}>
                    <Text style={[styles.article_text, { fontWeight: "bold", fontSize: 18 }]}>{t('StatsPage.GetInspired', currentLanguage)}</Text>
                </View>
                <ArticleSlider />
            </View>
        </ScrollViewComponent>
    );
}

export default YourStats;
