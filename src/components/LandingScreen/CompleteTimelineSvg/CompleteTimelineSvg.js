import React, { useState, useEffect } from "react";
import TimelineSvg from "../../svg-components/TimelineSvg";
import { View, Text, Animated } from "react-native";
import PhoneSvg from "../../svg-components/Phone";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import completeTimelineSvgStyles from "./completeTimelineSvgStyles";

const CompleteTimelineSvg = () => {
  const { currentLanguage } = useLanguage();
  const [isLeft, setIsLeft] = useState(true);
  const phonePositionX = new Animated.Value(isLeft ? -3 : 0);
  const phoneOpacity = new Animated.Value(1);

  setTimeout(() => {
    setIsLeft(false);
  }, 1000);

  useEffect(() => {
    // Animation of phone's position when the component mounts
    const sequence = Animated.sequence([
      Animated.timing(phonePositionX, {
        toValue: 0,
        duration: 9000,
        useNativeDriver: false,
      }),
      Animated.timing(phonePositionX, {
        toValue: -3,
        duration: 9000,
        useNativeDriver: false,
      }),
    ]);

    const loop = Animated.loop(sequence);

    loop.start(() => {
      setIsLeft(true);
    });

    return () => {
      loop.stop();
    };
  }, []);

  return (
    <View>
      <View
        style={[
          isLeft ? "" : completeTimelineSvgStyles.containerCenter,
          { gap: 10 },
        ]}
      >
        <Animated.View
          style={[
            completeTimelineSvgStyles.phone,
            isLeft
              ? completeTimelineSvgStyles.phoneLeft
              : { marginLeft: phonePositionX },
            { opacity: phoneOpacity },
          ]}
        >
          {/* <PhoneSvg style={isLeft ? completeTimelineSvgStyles.phoneLeft : ""} /> */}
          <PhoneSvg />
        </Animated.View>
        <TimelineSvg />
      </View>
      <View style={completeTimelineSvgStyles.container}>
        <Text style={completeTimelineSvgStyles.textRight}>
          {t("SolutionTimeline.Bottom.first", currentLanguage)}
        </Text>
        <Text style={completeTimelineSvgStyles.text}>
          {t("SolutionTimeline.Bottom.second", currentLanguage)}
        </Text>
        <Text style={completeTimelineSvgStyles.textLeft}>
          {t("SolutionTimeline.Bottom.third", currentLanguage)}
        </Text>
      </View>
    </View>
  );
};

export default CompleteTimelineSvg;
