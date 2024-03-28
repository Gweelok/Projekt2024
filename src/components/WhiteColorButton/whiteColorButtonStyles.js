import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import indexStyles from "../../styles/index";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.9;

const whiteColorButton = StyleSheet.create({
  button: {
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    width: buttonWidth, // needs to change percentage
    height: indexStyles.metrics.button.colored.height,
    alignItems: "center",
    justifyContent: "center",
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.button.colored.borderWidth,
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
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.h4,
  },
});

export default whiteColorButton;
