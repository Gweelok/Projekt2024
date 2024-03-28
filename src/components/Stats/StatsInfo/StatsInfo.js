import { Text, View } from "react-native";
import React from "react";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import statsInfoStyles from "./statsInfoStyles";

export const StatsInfo = () => {
  const { currentLanguage } = useLanguage();

  return (
    <View style={statsInfoStyles.container}>
      <Text style={statsInfoStyles.text}>KU Lighthouse</Text>
    </View>
  );
};
export default StatsInfo;
