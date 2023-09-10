import React, { useState } from "react";
import TimelineSvg from "../svg-components/TimelineSvg";
import { View, StyleSheet, Text } from "react-native";
import PhoneSvg from "../svg-components/Phone";
import { t, useLanguage } from "../../Languages/LanguageHandler";
const CompleteTimelineSvg = () => {
  const { currentLanguage } = useLanguage();
  const [isLeft, setIsLeft] = useState(true);
  setTimeout(() => {
    setIsLeft(false);
  }, 1000);
  return (
    <View>
      <View style={[isLeft ? "" : styles.containerCenter, { gap: 10 }]}>
        <PhoneSvg style={isLeft ? styles.phoneLeft : ""} />
        <TimelineSvg />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{t("SolutionTimeline.Bottom.first", currentLanguage)}</Text>
        <Text>{t("SolutionTimeline.Bottom.second", currentLanguage)}</Text>
        <Text>{t("SolutionTimeline.Bottom.third", currentLanguage)}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  phoneLeft: {
    left: -10,
  },
  containerCenter: {
    alignItems: "center",
  },
});
export default CompleteTimelineSvg;
