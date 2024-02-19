import React from "react";
import { View, StyleSheet } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import { windowHeight, windowWidth } from "../utils/Dimensions";
import ReportedItemsContent
  from "../components/ReportedItems/ReportedItemsContent";

const ReportedItems = ({ route }) => {
  const { location } = route.params;

  return (
    <View style={[style.container, GlobalStyle.BodyWrapper]}>
      <ReportedItemsContent location={location}></ReportedItemsContent>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    marginTop: 40,
    alignItems: "center",
  },
});

export default ReportedItems;
