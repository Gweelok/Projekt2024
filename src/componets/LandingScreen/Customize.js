import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { Primarycolor1,Primarycolor2,Primarycolor3 } from "../../styles/Stylesheet";
const Customize = ({top,image,bottom}) =>{
    return <View style={{flex:1}}>
        <Text style={styling.top}>{top}</Text>
        <View style={styling.imageContainer}>{image}</View>
        <Text style={styling.bottom}>{bottom}</Text>
    </View>
}
const styling = StyleSheet.create({
    top:{fontSize: 35,
        fontFamily: "space-grotesk-bold",
        color:Primarycolor1
    },
    imageContainer:{
        flex:3,
        alignItems:"center",
        justifyContent:"center",
        marginBottom:30
    },
    bottom:{
        color:Primarycolor1,
        fontFamily: 'space-grotesk-bold',
        paddingHorizontal:20,
        flex:2,
        alignItems:"center",
        justifyContent:"center"
    }
})
export default Customize;