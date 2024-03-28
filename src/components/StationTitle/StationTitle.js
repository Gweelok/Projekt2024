import React from "react";
import { View, Text } from "react-native";
import stationTitle from "./stationTitleStyles";

const StationTitle = ({ title, description }) => {
  return (
    <View style={[stationTitle.container]}>
      <Text style={stationTitle.title}>{title}</Text>
      <Text style={stationTitle.description}>{description}</Text>
    </View>
  );
};

export default StationTitle;
