
import { Text, TouchableOpacity, View, } from "react-native";
import GlobalStyle from "../../../styles/GlobalStyle";
<<<<<<< HEAD
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../../styles/Stylesheet";
import {React, useContext, useEffect} from "react";
import {BoxLink} from "../../../styles/BoxLink";
import {AntDesign} from "@expo/vector-icons";
import {msg} from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage} from "../../../Languages/LanguageHandler";
import {useNavigation} from "@react-navigation/native";
import { LoaderContext } from "../../../componets/LoaderContext";
import { Screens } from "../../../utils/ScreenPaths";
=======
import { Backgroundstyle, Buttons, Primarycolor1, styles } from "../../../styles/Stylesheet";
import { React, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import { LoaderContext } from "../../LoaderContext";
import { convertKgToTons } from "../../../utils/uptainersUtils";
import { BoxLink } from "../../../styles/BoxLink";
>>>>>>> 5dd88e782c537700b43808d30761f25f2ee8aa2f

export const VisitedUptainerStat = (props) => {
    const { currentLanguage } = useLanguage();
    const navigation = useNavigation();
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const uptainer = props.uptainer;



<<<<<<< HEAD
    const handlePress = () => {
        navigation.navigate(Screens.STATS_INFO);
    };

    return(
=======
    return (
>>>>>>> 5dd88e782c537700b43808d30761f25f2ee8aa2f
        <View style={GlobalStyle}>
            <View>
                <View>
                    <TouchableOpacity >
                        <View style={styles.boxlink}>
                            <View style={GlobalStyle.BodyWrapper}>
                                <TouchableOpacity onPress={() => {
                                    setIsLoading(true);
<<<<<<< HEAD
                                    navigation.navigate(Screens.UPTAINER_DETAILS , {
                                        id: bestUptainers?.id,
                                        name: bestUptainers?.uptainerName,
                                        location: bestUptainers?.uptainerStreet,
                                        imageUrl: bestUptainers?.imageUrl,
=======
                                    navigation.navigate("UptainerDetails", {
                                        id: uptainer.uptainerId,
                                        name: uptainer.uptainerName,
                                        location: uptainer.uptainerStreet,
                                        uptainerImage: uptainer.uptainerImage,
                                        latitude: uptainer.uptainerLatitude,
                                        longitude: uptainer.uptainerLongitude
>>>>>>> 5dd88e782c537700b43808d30761f25f2ee8aa2f
                                    });
                                }}>
                                    <Text style={styles.menuItem_text}>{uptainer.uptainerStreet} </Text>
                                    <Text style={[styles.menuItem_text, { fontFamily: "space-grotesk", fontSize: 15 }]}>{uptainer.uptainerStreet}, {uptainer.uptainerCity}, {uptainer.uptainerZip}  </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.Icon_container}>
                                <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={GlobalStyle}>
                    <Text style={[Buttons.main_button, { paddingTop: 9, height: 40, width: "100%", color: "white" }]}>{uptainer.takenItems} {t('StatsPage.ItemsReused', currentLanguage)}</Text>
                    <View style={GlobalStyle}>
                        <Text style={[Backgroundstyle.informationScreens, { paddingTop: 9, height: 40, marginTop: 5, marginBottom: 40, paddingLeft: 10, width: "100%", color: Primarycolor1 }]}>{convertKgToTons(uptainer.savedCO2)}{t('StatsPage.CO2Save', currentLanguage)}</Text>
                    </View>
                </View>

                <View>
                    <BoxLink msg={t('StatsPage.Info', currentLanguage)} onPress={() => { navigation.navigate("StatsInfo") }} style={GlobalStyle.BodyWrapper} />
                </View>

            </View>
        </View>
    )
}
export default VisitedUptainerStat
