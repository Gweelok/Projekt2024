import React from "react";
import { View, Text } from "react-native";
import { useLanguage, t } from "../../Languages/LanguageHandler";
import { Octicons } from "@expo/vector-icons";
import TreesSvg from "../svg-components/TreesSvg";
import PlantSvg from "../svg-components/PlantSvg";
import SaleSvg from "../svg-components/SaleSvg";
const Problem = () => {
  const { currentLanguage } = useLanguage();
  return (
    <View>
      <Text>Hi from problem</Text>
      <View>
        <TreesSvg />
        <Octicons name="arrow-right" size={20} />
        {/* <PlantSvg/> */}
        <Octicons name="arrow-right" size={20} />
        <SaleSvg />
      </View>
    </View>
  );
};
export default Problem;
