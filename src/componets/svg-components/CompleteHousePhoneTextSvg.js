import React, { useState } from "react";
import HousePhoneTextSvg from "./HousePhoneTextSvg";
import {View,StyleSheet} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Primarycolor1 } from "../../styles/Stylesheet";
import {t, useLanguage} from "../../Languages/LanguageHandler";
const CompleteHousePhoneTextSvg = () =>{
    const {currentLanguage} = useLanguage();
    const [showFirstPhone,setShowFirstPhone] = useState(true);
    setTimeout(()=>{setShowFirstPhone(false)},1000)
    return <View style={styling.container}>
        <HousePhoneTextSvg showPhone={showFirstPhone} textUnderHouse={t("SolutionComponent.Bottom.firstHalf",currentLanguage)}/>
        <Octicons name="arrow-right" size={50} style={{color: Primarycolor1}}/>
        <HousePhoneTextSvg showPhone={!showFirstPhone} textUnderHouse={t("SolutionComponent.Bottom.secondHalf",currentLanguage)}/>
    </View>
}
const styling = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        width:"80%",
        alignItems:"center"
    }
})
export default CompleteHousePhoneTextSvg;