import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const stationTitle = StyleSheet.create({
  container: {
    marginLeft: indexStyles.metrics.container.stationTitle.marginLeft,
    alignItems: "center",
    justifyContent: "center",
    marginTop: indexStyles.metrics.container.stationTitle.marginTop,
  },
  title: {
    fontSize: indexStyles.typography.fontSize.h3,
    fontWeight: indexStyles.typography.fontWeight.bold,
    textAlign: "center",
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
  },
  description: {
    fontSize: indexStyles.typography.fontSize.body2,
    textAlign: "center",
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primary,
    marginBottom: indexStyles.metrics.text.description.marginBottom,
  },
});

export default stationTitle;
