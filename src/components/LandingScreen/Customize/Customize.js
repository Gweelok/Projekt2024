import React from "react";
import { View, Text } from "react-native";
import customizeStyles from "./customizeStyles";

const Customize = ({ top, image, bottom }) => {
  //each slide looks the same : it has a header with same styles,
  //an image svg in center and some bottom text
  //because of this i create this Customize components which gets data from parent and renders on the screen
  return (
    <View style={customizeStyles.container}>
      <Text style={customizeStyles.top}>{top}</Text>
      <View style={customizeStyles.imageContainer}>{image}</View>
      <Text style={customizeStyles.bottom}>{bottom}</Text>
    </View>
  );
};

export default Customize;
