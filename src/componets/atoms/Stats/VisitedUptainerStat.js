
import { Pressable, Text, TouchableOpacity, View, } from "react-native";
import GlobalStyle from "../../../styles/GlobalStyle";
import { Backgroundstyle, Buttons, Primarycolor1, Primarycolor2, Primarycolor3, Primarycolor4, styles } from "../../../styles/Stylesheet";
import { React, useContext, useEffect } from "react";
import { BoxLink } from "../../../styles/BoxLink";
import { AntDesign } from "@expo/vector-icons";
import { msg } from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage } from "../../../Languages/LanguageHandler";
import { useNavigation } from "@react-navigation/native";
import { LoaderContext } from "../../LoaderContext";
import { convertKgToTons } from "../../../utils/uptainersUtils";

export const VisitedUptainerStat = (props) => {
    const { currentLanguage } = useLanguage();
    const navigation = useNavigation();
    const { isLoading, setIsLoading } = useContext(LoaderContext);
    const uptainer = props.uptainer;







    return (
        <View style={{ backgroundColor: Primarycolor4, borderRadius: 10, margin: 5 }}>
            <View>
                <TouchableOpacity >
                    <View style={styles.boxlink}>
                        <View style={GlobalStyle.BodyWrapper}>
                            <TouchableOpacity onPress={() => {
                                setIsLoading(true);
                                navigation.navigate("UptainerDetails", {
                                    id: uptainer.uptainerId,
                                    name: uptainer.uptainerName,
                                    location: uptainer.uptainerStreet,
                                    uptainerImage: uptainer.uptainerImage,
                                    latitude:uptainer.uptainerLatitude,
                                    longitude:uptainer.uptainerLongitude
                                });
                            }}>
                                <Text style={styles.menuItem_text}>{uptainer.uptainerName} </Text>
                                <Text style={[styles.menuItem_text, { fontFamily: "space-grotesk", fontSize: 15 }]}>
                                    {uptainer.uptainerStreet}, {uptainer.uptainerCity}, {uptainer.uptainerZip}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Icon_container}>
                            <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
                <View>
                    <Text style={[Buttons.main_button, { marginTop: 0, borderWidth: 0, color: Primarycolor3 }]}>{uptainer.itemsReused} {t('StatsPage.ItemsReused', currentLanguage)}</Text>
                </View>
                <View>
                    <Text style={[Buttons.main_button, { marginTop: 0, borderWidth: 0, backgroundColor: Primarycolor2, color: Primarycolor1 }]}>{convertKgToTons(uptainer.savedCO2)}{t('StatsPage.CO2Save', currentLanguage)}</Text>
                </View>
                <View>
                    <Text style={[Buttons.main_button, { marginTop: 0, borderWidth: 0, color: Primarycolor3 }]}>{uptainer.droppedItems} {t('StatsPage.Visits', currentLanguage)}</Text>
                </View>
            </View>
        </View>
    )
}
export default VisitedUptainerStat
