import React from "react";
import { View, Text } from "react-native";
import greenBoxStyles from "./greenBoxStyles";

export const GreenBox = ({
  msg,
  data,
  secondMsg,
  secondData,
  containerStyle,
  textStyle,
  headerStyle,
  secondMsgStyle,
  secondDataStyle,
}) => {
  return (
    <View style={[greenBoxStyles.container, containerStyle]}>
      <View style={greenBoxStyles.background}>
        <Text style={[greenBoxStyles.messageText, textStyle]}>{msg}</Text>
        <View style={greenBoxStyles.rowData}>
          <Text style={[greenBoxStyles.dataText, headerStyle]}>{data}</Text>
          <View style={greenBoxStyles.secondMessageContainer}>
            <Text style={[greenBoxStyles.secondMessageText, secondMsgStyle]}>
              {secondMsg}
            </Text>
            <Text style={[greenBoxStyles.secondDataText, secondDataStyle]}>
              {secondData}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default GreenBox;
