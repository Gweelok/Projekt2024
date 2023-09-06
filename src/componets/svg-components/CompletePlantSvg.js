import React from "react";
import { Octicons } from "@expo/vector-icons";
import SaleSvg from "./SaleSvg";
import PlantSvg from "./PlantSvg";
import TreesSvg from "./TreesSvg";
import {View,StyleSheet} from "react-native"
const CompletePlantSvg = () =>{
    return <View style={styling.svgContainer}>
    <TreesSvg />
    <Octicons name="arrow-right" size={30} />
    <PlantSvg />
    <Octicons name="arrow-right" size={30} />
    <SaleSvg />
  </View>
}
const styling = StyleSheet.create({
    svgContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap:20
      
    }
  });
export default CompletePlantSvg;