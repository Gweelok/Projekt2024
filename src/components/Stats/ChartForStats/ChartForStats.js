import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";
import chartForStatsStyles from "./chartForStatsStyles";
import indexStyles from "../../../styles";
import { t, useLanguage } from "../../../languages/LanguageHandler";

const ChartForStats = ({ value, refreshing }) => {
  const chartRef = useRef(null);
  const { currentLanguage } = useLanguage();
  // Number month for statistic
  const numberMonth = 10;
  // Today Date
  const now = new Date();
  // Month name
  const monthsName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    t("months.may", currentLanguage),
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    t("months.October", currentLanguage),
    "Nov",
    "Dec",
  ];

  const retreiveChartOptions = () => {
    // Create array for statistics
    const monthlyData = [];
    const months = [];
    // Props
    const data = value;
    for (let i = numberMonth; i > 0; i--) {
      // Getting previous month
      let nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1);
      // Adding name of month
      months.push(monthsName[nextDate.getMonth()]);
      if (
        data[
          nextDate.getFullYear().toString() +
            "-" +
            (nextDate.getMonth() + 1).toString()
        ]
      ) {
        // Adding statistic in this month
        monthlyData.push(
          data[
            nextDate.getFullYear().toString() +
              "-" +
              (nextDate.getMonth() + 1).toString()
          ]
        );
      } else {
        // Adding 0 in this month
        monthlyData.push(0);
      }
    }

    // Set initial chart options
    return createChartOptions(months, monthlyData);
  };

  const options = retreiveChartOptions();
  useEffect(() => {
    if (refreshing || value) {
      const newOptions = retreiveChartOptions();
      chartRef.current.setOption(newOptions);
    }
  }, [value, refreshing]);

  // Set options on the chart
  useRef(() => {
    chartRef.current.setOption(options);
  }, []);

  // on refresh update into chart
  useEffect(() => {
    if (refreshing) {
      const newOptions = retreiveChartOptions();
      chartRef.current.setOption(newOptions);
    }
  }, [refreshing]);

  return (
    <View style={chartForStatsStyles.container}>
      <View style={chartForStatsStyles.chartContainer}>
        <ECharts ref={chartRef} option={options} />
      </View>
    </View>
  );
};

const createChartOptions = (months, data) => ({
  xAxis: {
    type: "category",
    data: months,
    axisLabel: {
      interval: 0, // Display all labels
      /* rotate: 45, // Rotate labels */
      textStyle: {
        fontSize: indexStyles.typography.fontSize.body4, // Adjust font size as needed
        /* fontWeight: 'bold'*/ // Make text bold
      },
    },
    axisTick: {
      alignWithLabel: true,
    },
    itemStyle: {
      color: indexStyles.colorPalette.Primarycolor1,
    },
  },
  yAxis: {
    type: "value",
    itemStyle: {
      color: indexStyles.colorPalette.Primarycolor1,
    },
  },
  series: [
    {
      data: data,
      type: "bar",
      itemStyle: {
        color: indexStyles.colorPalette.Primarycolor1,
      },
    },
  ],
});

export default ChartForStats;