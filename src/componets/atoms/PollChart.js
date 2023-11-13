import React from "react";
import { ECharts } from "react-native-echarts-wrapper";
import { View, Text, StyleSheet } from "react-native";
import { Primarycolor2 } from "../../styles/Stylesheet";

const PollChart = ({ pollData }) => {
  // Check if pollData is available
  if (!pollData) {
    return null;
  }

  let sum = 0;

  pollData.options.forEach((x) => (sum += x.responses));
  // Define the chart options using pollData
  const chartOptions = {
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    yAxis: {
      axisLabel: {
        inside: true,
        padding: [0, 0, 50, 0],
        hideOverlap: false,
      },
      type: "category",
      splitLine: {
        show: false, // Set show to false to hide the grid lines
      },
      axisLine: {
        show: false, // Hide the axis line
      },
      axisTick: {
        show: false, // Hide the axis tick
      },
      data: pollData.options.map((option) => option.text), // Use poll question as x-axis labels
    },
    xAxis: {
      axisLine: {
        show: false, // Hide the axis line
      },
      axisTick: {
        show: false, // Hide the axis tick
      },
      axisLabel: {
        show: false, // Hide the axis labels
      },
      type: "value",
      splitLine: {
        show: false, // Set show to false to hide the grid lines
      },
      boundaryGap: false,
    },
    series: [
      {
        stack: "chart",
        data: pollData.options.map((option) => option.responses), // Use user responses as y-axis values
        type: "bar",
        itemStyle: {
          height: 10,
          color: "#1c4b3d", // Use your primary color for the bars
        },
        barWidth: 30,
        backgroundStyle: {
          color: "white", // Set the background color
        },
        barBorderRadius: [0, 0, 10, 10], // Adjust the border radius to round the bottom corners
        barCategoryGap: 20, // Adjust the gap between bars if needed
      },
      {
        stack: "chart",
        silent: true,
        data: pollData.options.map((option) => sum - option.responses), // Use user responses as y-axis values
        type: "bar",
        itemStyle: {
          height: 10,
          color: Primarycolor2, // Use your primary color for the bars
        },
        barWidth: 30,
        backgroundStyle: {
          color: "white", // Set the background color
        },
        barBorderRadius: [0, 0, 10, 10], // Adjust the border radius to round the bottom corners
        barCategoryGap: 20, // Adjust the gap between bars if needed
      },
    ],
  };

  const containerStyle = StyleSheet.create({
    backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    width: "100%",
    height: 500,
    marginLeft: 0,
  });

  const chartStyle = StyleSheet.create({
    marginLeft: 100,
  });

  return (
    <View style={containerStyle}>
      <ECharts
        backgroundColor="#fff"
        style={chartStyle}
        option={chartOptions}
      />
    </View>
  );
  // Render the chart using ECharts
};

export default PollChart;
