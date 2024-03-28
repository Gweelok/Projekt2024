import { StyleSheet, Dimensions } from "react-native";
import { Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const productSavedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
  savedContainer: {
    justifyContent: "center",
    alignContent: "center",
    // alignSelf: "center",
    padding: indexStyles.metrics.container.saved.padding,
  },
  addedText: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: indexStyles.metrics.text.added.marginBottom,
    marginTop: indexStyles.metrics.text.added.marginTop,
    color: indexStyles.colorPalette.Primarycolor2,
    fontSize: indexStyles.typography.fontSize.h4,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
  checkmark: {
    borderRadius: windowWidth / 1.2,
    borderWidth: indexStyles.metrics.icon.checkmark.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor3,
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    height: windowHeight / 9,
    width: windowWidth / 4,
    backgroundColor: indexStyles.colorPalette.pureRed,
  },
  animatedView: {
    height: windowHeight / 9,
    width: windowWidth / 4,
    borderRadius: windowWidth,
    backgroundColor: indexStyles.colorPalette.transparent,
    borderColor: indexStyles.colorPalette.Primarycolor3,
    borderWidth: indexStyles.metrics.container.animation.borderWidth,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: indexStyles.metrics.container.animation.marginBottom,
    // justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  animatedText: {
    fontSize: indexStyles.typography.fontSize.h7,
    color: indexStyles.colorPalette.Primarycolor3,
    paddingBottom: indexStyles.metrics.text.animated.paddingBottom,
    zIndex: indexStyles.metrics.text.animated.zIndex,
    position: "absolute",
    width: indexStyles.metrics.text.animated.width,
    left: indexStyles.metrics.text.animated.left,
  },
  viewButton: {
    ...Buttons.secondary_button,
    borderWidth: indexStyles.metrics.button.isTakenSavedDraft.borderWidth,
    width: indexStyles.metrics.button.isTakenSavedDraft.width,
    marginBottom: indexStyles.metrics.button.isTakenSavedDraft.marginBottom,
  },
  addDraftButton: {
    ...Buttons.secondary_button,
    borderWidth: indexStyles.metrics.button.isTakenSavedDraft.borderWidth,
    width: indexStyles.metrics.button.isTakenSavedDraft.width,
  },
  buttonText: {
    ...Buttons.secondary_buttonText,
  },
});

export default productSavedStyles;
