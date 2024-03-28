import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles } from "../../../styles/Stylesheet";

const statsInfoStyles = StyleSheet.create({
  container: {
    ...indexStyles.metrics.screen.wrapper,
    alignContent: "center",
    marginTop: indexStyles.metrics.container.statsInfo.marginTop,
  },
  text: {
    ...styles.paragraph_text,
    fontSize: indexStyles.typography.fontSize.body10,
  },
});

export default statsInfoStyles;
