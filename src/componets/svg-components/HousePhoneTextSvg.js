import React from "react";
import {View,Text,StyleSheet} from "react-native";
import PhoneSvg from "./Phone";
import HouseSvg from "./House";
import { Primarycolor1 } from "../../styles/Stylesheet";
const HousePhoneTextSvg = ({showPhone, textUnderHouse}) =>{
    return <View style={styling.container}>
        <PhoneSvg style={styling.phone}/>
        <HouseSvg/>
        <Text style={styling.text}>{textUnderHouse} dummy text</Text>
    </View>
};
const styling = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        color:Primarycolor1,
        fontFamily: 'space-grotesk',
        marginTop:10
    },
    phone:{
        position:"absolute",
        top:"-55%",
        left:"-5%",
    }
})
export default HousePhoneTextSvg;