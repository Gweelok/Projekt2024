import { StyleSheet, Dimensions } from "react-native";
import indexStyles from "../../styles/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const pollChartStyles = StyleSheet.create({
  pollHeaderContainer: {
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    display: "flex",
    width: indexStyles.metrics.container.pollHeader.width,
    height: indexStyles.metrics.container.pollHeader.height,
    minHeight: indexStyles.metrics.container.pollHeader.minHeight,
    marginBottom: indexStyles.metrics.container.pollHeader.marginBottom,
    marginTop: indexStyles.metrics.container.pollHeader.marginTop,
  },
  containerStyles: {
    flexDirection: "column",
    width: indexStyles.metrics.container.pollHeaderStyles.width,
    height: indexStyles.metrics.container.pollHeaderStyles.height,
    minHeight: indexStyles.metrics.container.pollHeaderStyles.minHeight,
    marginBottom: indexStyles.metrics.container.pollHeaderStyles.marginBottom,
    marginTop: indexStyles.metrics.container.pollHeaderStyles.marginTop,
  },
  chartOptions: {
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    grid: {
      top: indexStyles.metrics.chart.poll.grid.top,
      width: indexStyles.metrics.chart.poll.grid.width,
      bottom: indexStyles.metrics.chart.poll.grid.bottom,
      left: indexStyles.metrics.chart.poll.grid.left,
      right: indexStyles.metrics.chart.poll.grid.right,
    },
    yAxis: {
      axisLabel: {
        padding: indexStyles.metrics.chart.poll.yAxis.axisLabel.padding,
        color: indexStyles.colorPalette.Primarycolor1,
        fontSize: indexStyles.typography.fontSize.body4,
      },
    },
    series: {
      itemStyle: {
        height: indexStyles.metrics.chart.poll.series.itemStyle.height,
        color: indexStyles.colorPalette.Primarycolor1,
      },
      barWidth: indexStyles.metrics.chart.poll.series.barWidth,
      barBorderRadius: indexStyles.metrics.chart.poll.series.barBorderRadius,
      label: {
        color: indexStyles.colorPalette.Primarycolor1,
        fontSize: indexStyles.typography.fontSize.body4,
        position: indexStyles.metrics.chart.poll.series.label.position,
        offset: indexStyles.metrics.chart.poll.series.label.offset,
      },
      itemStyleSilent: {
        height: indexStyles.metrics.chart.poll.series.itemStyleSilent.height,
        color: indexStyles.colorPalette.Primarycolor3,
      },
    },
  },
  questionText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body7,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginTop: indexStyles.metrics.text.pollQuestion.marginTop,
    marginBottom: indexStyles.metrics.text.pollQuestion.marginBottom,
    textAlign: "left",
    marginLeft: indexStyles.metrics.text.pollQuestion.marginLeft,
  },
  optionButton: {
    padding: indexStyles.metrics.button.pollOption.padding,
    margin: indexStyles.metrics.button.pollOption.margin,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.button.pollOption.borderWidth,
    marginBottom: indexStyles.metrics.button.pollOption.marginBottom,
  },
  optionText: {
    fontSize: indexStyles.typography.fontSize.body3,
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    color: indexStyles.colorPalette.Primarycolor1,
    marginLeft: indexStyles.metrics.text.optional.marginLeft,
  },
  loaded: {
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    height: indexStyles.metrics.height.full.height,
    opacity: indexStyles.metrics.misc.visible.opacity,
  },
  invisible: {
    opacity: indexStyles.metrics.misc.invisible.opacity,
    height: indexStyles.metrics.height.full.height,
  },
});

export default pollChartStyles;
