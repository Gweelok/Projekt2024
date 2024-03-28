import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const backButtonStyles = StyleSheet.create({
  container: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.container.backButton.width,
    height: indexStyles.metrics.container.backButton.height,
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    fontSize: indexStyles.typography.fontSize.h4,
    color: indexStyles.colorPalette.Primarycolor3,
  },
  backButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.back.width,
    height: indexStyles.metrics.button.back.height,
    justifyContent: "center",
    alignItems: "center",
    marginRight: indexStyles.metrics.button.back.marginRight,
    marginLeft: indexStyles.metrics.button.back.marginLeft,
  },
  icon: {
    color: indexStyles.colorPalette.Primarycolor3,
    size: indexStyles.metrics.icon.backButton.size,
  },
});

export default backButtonStyles;
