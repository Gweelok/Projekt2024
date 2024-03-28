import { View, Text, StyleSheet, Pressable } from "react-native";
import { Octicons } from "@expo/vector-icons";
import React, { useState } from "react";

import InformationScreen from "../../templates/standardScreens/informationScreen";
import landingScreenStyles from "./landingScreenStyles";

import Customize from "../../components/LandingScreen/Customize/Customize";
import ReuseSvg from "../../components/svg-components/ReuseSvg";
import CompletePlantSvg from "../../components/svg-components/CompletePlantSvg";
import CompleteHousePhoneText from "../../components/LandingScreen/CompleteHousePhoneText/CompleteHousePhoneText";
import BackButton from "../../components/BackButton/BackButton";
import CompleteTimelineSvg from "../../components/LandingScreen/CompleteTimelineSvg/CompleteTimelineSvg";

import { useLanguage, t } from "../../languages/LanguageHandler";
import LanguageDropdown from "../../languages/language-dropdown/LanguageDropdown";
import Screens from "../../utils/ScreenPaths";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const navigation = useNavigation();
  // for multi language
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const backButton =
    currentSlide === 0 ? null : (
      <BackButton onPress={() => setCurrentSlide(currentSlide - 1)} />
    );

  //data to be used that will render on the screen

  const data = [
    {
      top: t("LandingScreen.Header", currentLanguage),
      image: <ReuseSvg />,
      bottom: t("LandingScreen.Intro", currentLanguage),
    },
    {
      top: t("ProblemComponent.Header", currentLanguage),
      image: <CompletePlantSvg />,
      bottom: t("ProblemComponent.Body", currentLanguage),
    },
    {
      top: t("SolutionComponent.Header", currentLanguage),
      image: <CompleteHousePhoneText />,
      bottom: t("SolutionComponent.Body", currentLanguage),
    },
    {
      top: t("SolutionTimeline.Header", currentLanguage),
      image: <CompleteTimelineSvg />,
      bottom: t("SolutionTimeline.Body", currentLanguage),
    },
  ];

  function nextSlideAndSignUp() {
    if (currentSlide + 2 > data.length) {
      navigation.navigate(Screens.SIGN_UP);
    } else {
      setCurrentSlide((previousState) => previousState + 1);
    }
  }

  return (
    <InformationScreen>
      <View style={landingScreenStyles.topBar}>
        {backButton}
        {[1, 2, 3, 4].includes(currentSlide) ? null : <LanguageDropdown />}
      </View>

      {<Customize {...data[currentSlide]} />}

      <Pressable
        onPress={nextSlideAndSignUp}
        style={landingScreenStyles.continueButtonContainer}
      >
        <Text style={landingScreenStyles.continueButton}>
          {t("LandingScreen.continue", currentLanguage)}
        </Text>
      </Pressable>

      <View style={landingScreenStyles.tabBarStyle}>
        {data.map((element, index) => (
          <Octicons
            key={index}
            name={`dot${index === currentSlide ? "-fill" : ""}`}
            style={landingScreenStyles.dotIcon}
          />
        ))}
      </View>
    </InformationScreen>
  );
};

export default LandingScreen;
