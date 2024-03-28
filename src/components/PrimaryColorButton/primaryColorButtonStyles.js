import { StyleSheet, Dimensions } from "react-native";
import indexStyles from "../../styles/index";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.9;

const primaryColorButton = StyleSheet.create({
  button: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: buttonWidth, // need to change to
    height: indexStyles.metrics.button.colored.height,
    alignItems: "center",
    justifyContent: "center",
    // shadow for ios
    shadowColor: indexStyles.colorPalette.black,
    shadowOffset: {
      width: indexStyles.metrics.button.colored.shadowOffset.width,
      height: indexStyles.metrics.button.colored.shadowOffset.height,
    },
    shadowOpacity: indexStyles.metrics.button.colored.shadowOpacity,
    shadowRadius: indexStyles.metrics.button.colored.shadowRadius,
    // shadow for Android
    elevation: indexStyles.metrics.button.colored.elevation,
  },
  buttonText: {
    fontFamily: indexStyles.typography.fontFamily.primary,
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.h4,
  },
});

export default primaryColorButton;
