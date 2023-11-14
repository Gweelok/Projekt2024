import React from "react";
import { ECharts } from "react-native-echarts-wrapper";
import { Text, View, StyleSheet } from "react-native";
import {
  Primarycolor1,
  Primarycolor2,
  Primarycolor3,
} from "../../styles/Stylesheet";

const PollChart = ({ pollData }) => {
  // Check if pollData is available
  if (!pollData) {
    return null;
  }

  let sum = 0;

  pollData.options.forEach((x) => (sum += x.responses));

  // Reverse the order of options
  const reversedOptions = [...pollData.options].reverse();

  // Define the chart options using pollData
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

  const styles = StyleSheet.create({
    labelContainer: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingRight: 15,
    },
    labelText: {
      color: Primarycolor1,
      fontSize: 16,
      fontFamily: "space-grotesk-Medium",
    },
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
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{/* Show percentage here */}</Text>
      </View>
    </View>
  );
};

export default PollChart;
