import React, {useState} from "react";
import {View, Text, TouchableOpacity, ScrollView, SafeAreaView, ScrollViewComponent} from 'react-native';
import { styles, Backgroundstyle, HeaderText, Buttons } from '../styles/Stylesheet';
import Navigationbar from '../componets/Navigationbar';
import { useNavigation } from "@react-navigation/native";
import { t, useLanguage } from "../Languages/LanguageHandler";
import BackButton from "../componets/BackButton";
import GlobalStyle from "../styles/GlobalStyle";
import ChartForStats from "../componets/atoms/ChartForStats";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon library
import StreetStat from "../componets/atoms/StreetStat";
import VisitedUptainerStat from "../componets/atoms/VisitedUptainerStat";
import Svg, { Path } from "react-native-svg";
import LightbulbIcon from "../componets/svg-components/LightbulbIcon";
import YourStats from "./YourStats";
import GreenBox from "../styles/GreenBox";



const Stat = ({navigation}) => {
    const { currentLanguage } = useLanguage();


    const handlePress = () => {
        navigation.goBack();
    };
    const [activeButton, setActiveButton] = useState('main'); // 'main' or 'secondary'

    const handlePress1 = (button) => {
        setActiveButton(button);
    };


    return (
        <View style={[Backgroundstyle.interactive_screens,{ flex: 1, justifyContent: 'center' }]}>
<SafeAreaView>

            <ScrollView>
                <View style={{ flexDirection: "row", alignItems: "center", alignSelf:"flex-start", marginHorizontal:-8 }}>
                    <BackButton onPress={handlePress} />
                    <Text style={[HeaderText.Header,{fontFamily: "space-grotesk-Medium" }]}>
                        <Text>{t("StatsPage.Header", currentLanguage)}</Text>
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, }}>
                    <View style={{marginRight:7}}>
                        <TouchableOpacity
                            style={[
                                activeButton === 'main' ? Buttons.main_button : Buttons.secondary_button,
                                { width: 173, height: 41 }
                            ]}
                            onPress={() => handlePress1('main')}
                        >
                            <Text style={activeButton === 'main' ? Buttons.main_buttonText : Buttons.secondary_buttonText}>
                                {t('StatsPage.MainButton', currentLanguage)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[
                                activeButton === 'secondary' ? Buttons.main_button : Buttons.secondary_button,
                                { width: 173, height: 41 }
                            ]}
                            onPress={() => handlePress1('secondary')}
                        >
                            <Text style={activeButton === 'secondary' ? Buttons.main_buttonText : Buttons.secondary_buttonText}>
                                {t('StatsPage.SecondaryButton', currentLanguage)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {activeButton === 'main' ? (
                <View style={{ justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ marginTop: 15, marginBottom:10  }}>
                        <Text style={[styles.article_text,{fontWeight: "bold", fontSize: 18}]}>{t('StatsPage.AmountReduced', currentLanguage)}</Text>
                    </View>
                    <View>
                        <View>
                            <View>
                                <GreenBox msg= {t('StatsPage.SoFar', currentLanguage)}
                                          data={"50000 t."}
                                          secondMsg={t('StatsPage.Yesterday', currentLanguage)}
                                          secondData={"57 t"}
                                />
                            </View>
                            <View>
                                <GreenBox msg={t('StatsPage.InTotal', currentLanguage)}
                                          data={"50000 t."}/>
                            </View>

                        </View>
                    </View>
                    <View style={[ { height: 285, }]}>
                        <ChartForStats />
                    </View>
                    <View style={{ marginTop: 2, marginBottom:20}}>
                        <Text style={[styles.article_text,{fontWeight: "bold", fontSize: 18}]}>{t('StatsPage.AmountCO2', currentLanguage)}</Text>
                    </View>
                    <View>
                        <View>
                            <GreenBox msg= {t('StatsPage.SoFar', currentLanguage)}
                                      data={"50000 t."}
                                      secondMsg={t('StatsPage.Yesterday', currentLanguage)}
                                      secondData={"57 t"}
                            />
                        </View>
                        <View>
                            <GreenBox msg={t('StatsPage.InTotal', currentLanguage)}
                                      data={"50000 t."}/>
                        </View>

                    </View>
                    <View>
                        <View style={[{ flexDirection: 'row',  marginTop:20, marginBottom:3,marginRight: "4%", }]}>
                            <LightbulbIcon />
                            <Text style={[styles.paragraph_text,{marginLeft:5}]}> {t('StatsPage.kgCO2', currentLanguage)}</Text>
                        </View>
                        <View style={[{ flexDirection: 'row', marginTop:5, marginBottom:3,marginRight: "4%", }]}>
                            <LightbulbIcon />
                            <Text style={[styles.paragraph_text, {marginLeft:5}]}> {t('StatsPage.Amount', currentLanguage)} </Text>
                        </View>
                    </View>
                    <View style={[{alignContent:"center", marginTop:30}]}>
                        <Text style={styles.menuItem_text}>{t('StatsPage.BestAcheieve', currentLanguage)}</Text>
                    </View>
                    <StreetStat/>
                    <StreetStat/>
                    <StreetStat/>
                    <View style={[{alignContent:"center", marginTop:30}]}>
                        <Text style={[styles.menuItem_text, {marginBottom:10}]}>{t('StatsPage.MostVisitedUptainer', currentLanguage)}</Text>
                        <VisitedUptainerStat navigation={navigation}/>
                    </View>
                </View>
                ) : (
                    <YourStats/>
                )}
                <View style={{marginTop:50}}></View>
            </ScrollView>
</SafeAreaView>
            <Navigationbar navigation={navigation} />

        </View>
    );
}

export default Stat;
