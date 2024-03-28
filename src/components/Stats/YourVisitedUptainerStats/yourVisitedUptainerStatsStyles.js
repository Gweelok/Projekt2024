import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles } from "../../../styles/Stylesheet";

const yourVisitedUptainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  boxLink: {
    ...styles.boxlink,
  },
  bodyWrapper: {
    ...indexStyles.metrics.screen.wrapper,
  },
  menuItemText: {
    ...styles.menuItem_text,
  },
  addressText: {
    ...styles.menuItem_text,
    fontFamily: indexStyles.typography.fontFamily.primary,
    fontSize: indexStyles.typography.fontSize.body2,
  },
  iconContainer: {
    ...styles.Icon_container,
  },
  menuItemArrow: {
    ...styles.menuItem_arrow,
    fontSize: indexStyles.metrics.icon.arrowRight.size,
  },
});

export default yourVisitedUptainerStyles;
