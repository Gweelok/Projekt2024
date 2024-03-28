import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const chartForStatsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    height: indexStyles.metrics.container.chart.height,
    width: indexStyles.metrics.container.chart.width,
  },
});

export default chartForStatsStyles;
