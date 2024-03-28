import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const customInputStyles = StyleSheet.create({
  container: {
    width: indexStyles.metrics.width.full.width,
    flexDirection: "column",
  },
  hintText: {
    fontSize: indexStyles.typography.fontSize.body3,
    marginTop: indexStyles.metrics.text.hint.marginTop,
    marginLeft: indexStyles.metrics.text.hint.marginLeft,
    marginBottom: indexStyles.metrics.text.hint.marginBottom,
  },
});

export default customInputStyles;
