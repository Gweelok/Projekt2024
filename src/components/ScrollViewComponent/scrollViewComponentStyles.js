import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const scrollViewComponentStyles = StyleSheet.create({
  viewStyle: {
    marginTop: indexStyles.metrics.margin.scrollView.marginTop,
    minHeight: indexStyles.metrics.margin.scrollView.minHeight,
    marginBottom: indexStyles.metrics.margin.scrollView.marginBottom,
  },
});

export default scrollViewComponentStyles;
