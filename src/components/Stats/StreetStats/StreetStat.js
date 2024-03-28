import React from "react";
import { Text, View } from "react-native";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import { convertKgToTons } from "../../../utils/uptainersUtils";
import streetStatStyles from "./streetStatsStyles";

const StreetStat = (props) => {
  const { currentLanguage } = useLanguage();

  const uptainer = props.uptainer;

  return (
    <View style={streetStatStyles.container}>
      <Text style={[streetStatStyles.uptainerName, { fontSize: 19 }]}>
        {uptainer.uptainerName}{" "}
      </Text>
      <Text style={streetStatStyles.uptainerStreet}>
        {uptainer.uptainerStreet}{" "}
      </Text>
      <View style={streetStatStyles.messageContainer}>
        <Text style={[streetStatStyles.itemsReusedText, {
          width: `${props.pos}%`,
        }]}>
          {uptainer.takenItems} {t("StatsPage.ItemsReused", currentLanguage)}
        </Text>
      </View>
      <View style={streetStatStyles.messageContainer}>
        <Text
          style={[
            streetStatStyles.co2SavedText,
            {
              width: `${props.pos}%`,
            },
          ]}
        >
          {convertKgToTons(uptainer.savedCO2)}
          {t("StatsPage.CO2Save", currentLanguage)}
        </Text>
      </View>
    </View>
  );
};

export default StreetStat;
