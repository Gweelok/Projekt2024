import React from "react";
import { ECharts } from "react-native-echarts-wrapper";
import { Text, View, StyleSheet } from "react-native";
import {
  Primarycolor1,
  Primarycolor2,
  Primarycolor3,
} from "../../styles/Stylesheet";

const PollChart = ({ pollData }) => {
  // If pollData is available
  if (!pollData) {
    return null;
  }

  let sum = 0;

  pollData.options.forEach((x) => (sum += x.responses));

  // Reversing the order of options
  const reversedOptions = [...pollData.options].reverse();

  // Chart's options using pollData
  const chartOptions = {
    grid: {
      top: 0,
      width: "100%",
      bottom: 0,
      left: 20,
      right: 0,
    },
    yAxis: {
      axisLabel: {
        inside: true,
        padding: [0, 0, 45, -7],
        hideOverlap: false,
        color: Primarycolor1,
        fontSize: 13,
        textStyle: {
          fontFamily: "space-grotesk-Medium",
        },
      },
      type: "category",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: reversedOptions.map((option) => option.text),
    },
    xAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      type: "value",
      splitLine: {
        show: false,
      },
      boundaryGap: false,
    },
    series: [
      {
        stack: "chart",
        data: reversedOptions.map((option) => option.responses),
        type: "bar",
        itemStyle: {
          height: 10,
          color: Primarycolor1,
        },
        barWidth: 20,
        barBorderRadius: [0, 0, 0, 0],
        label: {
          show: true,
          formatter: "{c}%",
          color: Primarycolor1,
          fontSize: 13,
          fontFamily: "space-grotesk-Medium",
          position: "outsideRight",
          offset: [250, -22],
        },
      },
      {
        stack: "chart",
        silent: true,
        data: reversedOptions.map((option) => sum - option.responses),
        type: "bar",
        itemStyle: {
          height: 10,
          color: Primarycolor3,
        },
        barWidth: 20,
        barBorderRadius: [0, 0, 0, 0],
        label: {
          show: false,
        },
      },
    ],
  };

  const containerStyle = StyleSheet.create({
    flexDirection: "column",
    width: "100%",
    height: 379,
    backgroundColor: Primarycolor2,
    marginBottom: 15,
    marginTop: 15,
  });

  return (
    <View style={containerStyle}>
      <Text
        style={{
          color: Primarycolor1,
          fontSize: 18,
          fontFamily: "space-grotesk-Medium",
          fontWeight: "bold",
          marginTop: 13,
          marginBottom: 20,
          textAlign: "left",
          marginLeft: 15,
        }}
      >
        {pollData.question}
      </Text>
      <ECharts
        style={containerStyle}
        option={chartOptions}
        backgroundColor={Primarycolor2}
      />
    </View>
  );
};

export default PollChart;
