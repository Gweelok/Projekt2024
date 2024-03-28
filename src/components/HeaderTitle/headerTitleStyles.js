import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const headerTitleStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: indexStyles.metrics.container.headerTitle.marginLeft,
    marginBottom: indexStyles.metrics.container.headerTitle.marginBottom,
    alignItems: "center",
    alignContent: "center",
  },
  icon: {
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.h2,
  },
  iconButtonLeft: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.headerIcon.width,
    height: indexStyles.metrics.button.headerIcon.height,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButtonRight: {
    marginLeft: indexStyles.metrics.button.headerIcon.marginLeft,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.headerIcon.width,
    height: indexStyles.metrics.button.headerIcon.height,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitleText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body1,
  },
});

export default headerTitleStyles;
