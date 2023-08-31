import React from "react";
import { View,Text,StyleSheet } from "react-native";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import {
    styles,
    Primarycolor1,  
  } from "../../styles/Stylesheet";
const Solution = () =>{
    const {currentLanguage} = useLanguage();
    return <View style={styling.container}>
        <Text style={styling.header}>{t("SolutionComponent.Header",currentLanguage)}</Text>
        <View style={styling.imagesContainer}></View>
        <Text style={styling.bottomText}>{t("SolutionComponent.Body",currentLanguage)}</Text>
    </View>
}
const styling = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        borderColor:"red",
        borderWidth:1
    },
    header:{
       ...styles.Header_Primarycolor1,
       ...styles.Header,
       marginLeft:0,
       marginTop:0,
    },
    imagesContainer:{
        flex:1,
    },
    bottomText:{
       
    }
})
export default Solution;