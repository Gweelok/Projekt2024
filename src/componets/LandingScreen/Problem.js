import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { Octicons } from "@expo/vector-icons";
import TreesSvg from "../svg-components/TreesSvg";
import PlantSvg from "../svg-components/PlantSvg";
import SaleSvg from "../svg-components/SaleSvg";
import {
  styles,
  Backgroundstyle,
  Primarycolor1,
  Buttons,
} from "../../styles/Stylesheet";
const Problem = () => {
  const { currentLanguage } = useLanguage();
  return (
    <View>
      <Text style={[styles.Header_Primarycolor1, styles.Header]}>
        {t("ProblemComponent.Header",currentLanguage)}
      </Text>
      <View style={styling.svgContainer}>
        <TreesSvg />
        <Octicons name="arrow-right" size={50} />
        <PlantSvg />
        <Octicons name="arrow-right" size={50} />
        <SaleSvg />
      </View>
      <Text style={styling.Intro}>
        {t("ProblemComponent.Body",currentLanguage)}
      </Text>
    </View>
  );
};
const styling = StyleSheet.create({
  svgContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Intro: {
    color: Primarycolor1,
    fontFamily: "space-grotesk",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    marginBottom: 15,
  },
});
export default Problem;
