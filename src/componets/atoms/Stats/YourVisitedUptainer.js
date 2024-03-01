import GlobalStyle from "../../../styles/GlobalStyle";
import {Pressable, Text, TouchableOpacity, View,} from "react-native";
import {Backgroundstyle, Buttons, Primarycolor1, styles} from "../../../styles/Stylesheet";
import {React, useContext} from "react";
import {BoxLink} from "../../../styles/BoxLink";
import {AntDesign} from "@expo/vector-icons";
import {msg} from "@babel/core/lib/config/validation/option-assertions";
import { t, useLanguage} from "../../../Languages/LanguageHandler";
import {useNavigation} from "@react-navigation/native";
import { LoaderContext } from "../../../componets/LoaderContext";
import Screens from "../../../utils/ScreenPaths";

export const YourVisitedUptainer = (value) => {
    const navigation = useNavigation();
    const { currentLanguage } = useLanguage();
    const { isLoading, setIsLoading } = useContext(LoaderContext);

    const uptainerData = value["value"]

    // Create variables for information about uptainer
    let location = 'n/d';
    let address = 'n/d';
    let city = 'n/d';
    let zip = 'n/d';

    if(value){
        location = uptainerData["uptainerName"];
        address = uptainerData["uptainerStreet"];
        city = uptainerData["uptainerCity"];
        zip = uptainerData["uptainerZip"];
    }
    return(
        <View style={GlobalStyle}>
            <View>
                <View>
                    <TouchableOpacity onPress={() => {
                                    setIsLoading(true);
                                    navigation.navigate(Screens.UPTAINER_DETAILS, {
                                        uptainer:uptainerData
                                    });
                                    }}>
                        <View style={styles.boxlink}>
                            <View style={GlobalStyle.BodyWrapper}>
                                <Text style={styles.menuItem_text}>{location} </Text>
                                <Text style={[styles.menuItem_text,{ fontFamily: "space-grotesk",fontSize: 15}]}>{address}, {city}, {zip} </Text>
                            </View>
                            <View style={styles.Icon_container}>
                                <AntDesign name="right" size={30} style={styles.menuItem_arrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
export default YourVisitedUptainer
