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
    flex: 2,
    textAlign:"center",
  },
});

export default customizeStyles;
