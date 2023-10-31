import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PhoneSvg from "../svg-components/Phone";
import HouseSvg from "../svg-components/House";
import { Primarycolor1 } from "../../styles/Stylesheet";
const HousePhoneText = ({ showPhone, textUnderHouse }) => {
  //created a container that has the svgs of : phone,house and text
  //conditional dispay the phone svg depending on instructions of parrent component;
  //display text from parent component;
  //this is actually half currently of CompleteHousePhoneText component
  return (
    <View style={styling.container}>
      {showPhone ? <PhoneSvg style={styling.phone} /> : null}
      <HouseSvg />
      <Text style={styling.text}>{textUnderHouse}</Text>
    </View>
  );
};
const styling = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Primarycolor1,
    fontFamily: "space-grotesk-bold",
    marginTop: 10,
  },
  phone: {
    position: "absolute",
    top: -45,
    left: -15,
  },
});
export default HousePhoneText;
