import React, { useState } from "react";
import HousePhoneText from "../HousePhoneText/HousePhoneText";
import { View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { t, useLanguage } from "../../../languages/LanguageHandler";
import completeHousePhoneTextStyles from "./completeHousePhoneTextStyles";

const CompleteHousePhoneText = () => {
  const { currentLanguage } = useLanguage();
  const [showFirstPhone, setShowFirstPhone] = useState(true);
  setTimeout(() => {
    setShowFirstPhone(false);
  }); // you can add the time of showing the pone on the screen.
  // this is the main components that gets to be shown on the screen
  // it has 2 components of HousePhoneText and uses state to tell what child should show the phone svg
  return (
    <View style={completeHousePhoneTextStyles.container}>
      <HousePhoneText
        showPhone={showFirstPhone}
        textUnderHouse={t(
          "SolutionComponent.Bottom.firstHalf",
          currentLanguage
        )}
      />
      <Octicons
        name="arrow-right"
        size={completeHousePhoneTextStyles.iconArrowRight.size}
        style={{ color: completeHousePhoneTextStyles.iconArrowRight.color }}
      />
      <HousePhoneText
        showPhone={!showFirstPhone}
        textUnderHouse={t(
          "SolutionComponent.Bottom.secondHalf",
          currentLanguage
        )}
      />
    </View>
  );
};
export default CompleteHousePhoneText;
