import React, { useState } from "react";
import TimelineSvg from "../svg-components/TimelineSvg";
import { View, StyleSheet, Text } from "react-native";
import PhoneSvg from "../svg-components/Phone";
import { t, useLanguage } from "../../Languages/LanguageHandler";
import { Primarycolor1 } from "../../styles/Stylesheet";
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          color: Primarycolor1,
        }}
      >
        <Text style={[{ right: 15 }, styles.text]}>
          {t("SolutionTimeline.Bottom.first", currentLanguage)}
        </Text>
        <Text style={styles.text}>
          {t("SolutionTimeline.Bottom.second", currentLanguage)}
        </Text>
        <Text style={[{ left: 15 }, styles.text]}>
          {t("SolutionTimeline.Bottom.third", currentLanguage)}
        </Text>
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
  text: {
    color: Primarycolor1,
    fontFamily: "space-grotesk-bold",
  },
});
export default CompleteTimelineSvg;
