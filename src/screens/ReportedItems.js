import React from "react";
import { View, StyleSheet } from "react-native";
import GlobalStyle from "../styles/GlobalStyle";
import { windowHeight, windowWidth } from "../utils/Dimensions";

import ReportedItemsContent
  from "../components/ReportedItems/ReportedItemsContent";
const ReportedItems = ({ route }) => {
   const { location = route.params?.param } = route.params || {};

  return (
    <View style={[GlobalStyle.BodyWrapper]}>
     <ReportedItemsContent location={location}></ReportedItemsContent>
    </View>
  );
};

export default ReportedItems;
