import React from "react";
import ECharts from "react-native-echarts-wrapper";

const PollChart = ({ pollData }) => {
  // Check if pollData is available
  if (!pollData) {
    return null;
  }

  // Define the chart options using pollData
  const chartOptions = {
    xAxis: {
      type: "category",
      data: pollData.options.map((option)=>option.text), // Use poll question as x-axis labels
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: pollData.options.map((option)=>option.responses), // Use user responses as y-axis values
        type: "bar",
        itemStyle: {
          color: "#1c4b3d", // Use your primary color for the bars
        },
      },
    ],
  };

  return <ECharts option={chartOptions} />; // Render the chart using ECharts
};

export default PollChart;