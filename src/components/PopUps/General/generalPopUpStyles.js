import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { Buttons } from "../../../styles/Stylesheet";

const generalPopUpStyles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: indexStyles.colorPalette.transparentBlack,
  },
  popUpContainer: {
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    padding: indexStyles.metrics.container.popUp.padding,
    borderRadius: indexStyles.metrics.container.popUp.borderRadius,
    width: indexStyles.metrics.container.popUp.width,
    aspectRatio: indexStyles.metrics.container.popUp.aspectRatio,
    justifyContent: "center",
  },
  messageText: {
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.body3,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  confirmButton: {
    ...Buttons.main_button,
    marginBottom: indexStyles.metrics.button.confirm.marginBottom,
  },
  confirmButtonText: Buttons.main_buttonText,
  cancelButton: Buttons.secondary_button,
  cancelButtonText: Buttons.secondary_buttonText,
});

export default generalPopUpStyles;
