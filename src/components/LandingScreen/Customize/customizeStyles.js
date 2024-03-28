import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const customizeStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    fontSize: indexStyles.typography.fontSize.h1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    color: indexStyles.colorPalette.Primarycolor1,
    marginLeft: indexStyles.metrics.text.customTop.marginLeft,
  },
  imageContainer: {
    flex: 3,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: indexStyles.metrics.container.customImage.marginBottom,
  },
  bottom: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    paddingHorizontal: indexStyles.metrics.text.customBottom.paddingHorizontal,
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default customizeStyles;
