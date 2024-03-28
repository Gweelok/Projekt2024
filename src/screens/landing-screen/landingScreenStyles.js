import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { Buttons } from "../../styles/Stylesheet";

const landingScreenStyles = StyleSheet.create({
  tabBarStyle: {
    bottom: indexStyles.metrics.container.tabBar.bottom,
    elevation: indexStyles.metrics.container.tabBar.elevation,
    height: indexStyles.metrics.container.tabBar.height,
    width: indexStyles.metrics.container.tabBar.width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: indexStyles.metrics.container.tabBar.marginTop,
  },
  languageSelector: {
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    borderWidth: indexStyles.metrics.container.languageSelector.borderWidth,
    padding: indexStyles.metrics.container.languageSelector.padding,
    width: indexStyles.metrics.container.languageSelector.width,
    marginLeft: indexStyles.metrics.container.languageSelector.marginLeft,
  },
  topBar: {
    zIndex: indexStyles.metrics.container.topBar.zIndex,
    flexDirection: "row",
    alignSelf: "stretch",
    paddingHorizontal: indexStyles.metrics.container.topBar.paddingHorizontal,
    marginBottom: indexStyles.metrics.container.topBar.marginBottom,
    marginLeft: indexStyles.metrics.container.topBar.marginLeft,
  },
  continueButtonContainer: {
    ...Buttons.main_button,
    width: indexStyles.metrics.width.landingScreenMainButton.width,
  },
  backButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.back.width,
    height: indexStyles.metrics.button.back.height,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButton:{
    ...Buttons.main_buttonText
  },
  dotIcon:{
    fontSize : indexStyles.typography.fontSize.h3,
    color : indexStyles.colorPalette.Primarycolor1
  }
});

export default landingScreenStyles;
