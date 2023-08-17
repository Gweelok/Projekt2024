import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles, Backgroundstyle } from "../styles/Stylesheet";
import Navigationbar from "../componets/Navigationbar";
import React from "react";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tortor
        urna. Integer gravida sapien ut odio pellentesque, ut iaculis justo
        fringilla. Vestibulum auctor risus ut leo dignissim, vel tincidunt justo
        malesuada. Fusce quis nisl eget nisi consequat bibendum. Nunc ac mi ac
        nulla blandit interdum. Sed sed urna vel libero eleifend rhoncus. Proin
        ac malesuada urna. Curabitur auctor turpis nec nibh ullamcorper lacinia.
        Nulla in felis dapibus, feugiat dui at, malesuada enim. Vivamus eget
        accumsan eros. Fusce eget quam arcu.
      </Text>
      <Navigationbar navigation={navigation} />
    </View>
  );
};

export default PrivacyPolicy;
