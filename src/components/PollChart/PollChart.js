import React, { useEffect, useState } from "react";
import { ECharts } from "react-native-echarts-wrapper";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Primarycolor1, Primarycolor3 } from "../../styles/Stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pollChartStyles from "./pollChartStyles";

const PollChart = ({ pollData }) => {
  const [loaded, setLoaded] = useState(false);

  const [userClicked, setUserClicked] = useState(false);
  const [chartVisible, setChartVisible] = useState(false);
  const loadFromStorage = async () => {
    try {
      const getData = await AsyncStorage.getItem("pollClicked");
      if (getData) {
        setUserClicked(JSON.parse(getData));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionSelect = (option) => {
    // Show the chart when the poll option is pressed
    setChartVisible(true);
  };

  loadFromStorage();
  // If pollData is available
  if (!pollData) {
    return null;
  }

  let sum = 0;

  pollData.options.forEach((x) => (sum += x.responses)); //calculating the percentages

  // Reversing the order of options
  const reversedOptions = [...pollData.options].reverse();

  // Chart's options using pollData
  const chartOptions = {
    backgroundColor: pollChartStyles.chartOptions.backgroundColor,
    textStyle: {
      fontFamily: pollChartStyles.chartOptions.fontFamily,
    },
    grid: {
      top: pollChartStyles.chartOptions.grid.top,
      width: pollChartStyles.chartOptions.grid.width,
      bottom: pollChartStyles.chartOptions.grid.bottom,
      left: pollChartStyles.chartOptions.grid.left,
      right: pollChartStyles.chartOptions.grid.right,
    },
    yAxis: {
      axisLabel: {
        inside: true,
        padding: pollChartStyles.chartOptions.yAxis.axisLabel.padding,
        hideOverlap: false,
        color: pollChartStyles.chartOptions.yAxis.axisLabel.color,
        fontSize: pollChartStyles.chartOptions.yAxis.axisLabel.fontSize,
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
          height: pollChartStyles.chartOptions.series.itemStyle.height,
          color: pollChartStyles.chartOptions.series.itemStyle.color,
        },
        barWidth: pollChartStyles.chartOptions.series.barWidth,
        barBorderRadius: pollChartStyles.chartOptions.series.barBorderRadius,
        label: {
          show: true,
          formatter: "{c}%",
          color: pollChartStyles.chartOptions.series.label.color,
          fontSize: pollChartStyles.chartOptions.series.label.fontSize,
          position: pollChartStyles.chartOptions.series.label.position,
          offset: pollChartStyles.chartOptions.series.label.offset,
        },
      },
      {
        stack: "chart",
        silent: true,
        data: reversedOptions.map((option) => sum - option.responses),
        type: "bar",
        itemStyle: {
          height: pollChartStyles.chartOptions.series.itemStyleSilent.height,
          color: pollChartStyles.chartOptions.series.itemStyleSilent.color,
        },
        barWidth: pollChartStyles.chartOptions.series.barWidth,
        barBorderRadius: pollChartStyles.chartOptions.series.barBorderRadius,
        label: {
          show: false,
        },
      },
    ],
    additionalCode: `
        chart.on('rendered', function(param) {
            sendData('renderFinish');
        });
    `,
  };

  const onFinishLoading = () => {
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true);
      }, 500); //This is because on "rendered" event in echarts, it triggers too fast and we can see a white screen before it actually finishes rendering.
    }
  };

  const savePoll = async () => {
    try {
      await AsyncStorage.setItem("pollClicked", JSON.stringify(true));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={pollChartStyles.pollHeaderContainer}>
      <View style={pollChartStyles.containerStyles}>
        <Text style={pollChartStyles.questionText}>{pollData.question}</Text>
        {!chartVisible &&
          !userClicked &&
          pollData.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              onPress={() => {
                setUserClicked(true);
                savePoll();
                handleOptionSelect(option);
              }}
              style={pollChartStyles.optionButton}
            >
              <Text style={pollChartStyles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        {(chartVisible || userClicked) && (
          <View
            style={loaded ? pollChartStyles.loaded : pollChartStyles.invisible}
          >
            <ECharts onData={onFinishLoading()} option={chartOptions} />
          </View>
        )}
      </View>
    </View>
  );
};

export default PollChart;
