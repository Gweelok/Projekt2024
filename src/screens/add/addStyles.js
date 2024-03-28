import { StyleSheet } from "react-native";
import { Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const addStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    paddingTop: indexStyles.metrics.container.add.paddingTop,
    paddingHorizontal: indexStyles.metrics.container.add.paddingHorizontal,
  },
  header: {
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    fontSize: indexStyles.typography.fontSize.h1,
    color: indexStyles.colorPalette.Primarycolor1,
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginBottom: indexStyles.metrics.header.primary.marginBottom,
  },
  marginView: {
    marginLeft: indexStyles.metrics.margin.add.marginLeft,
    marginRight: indexStyles.metrics.margin.add.marginRight,
  },
  informativeText: {
    fontSize: indexStyles.typography.fontSize.body2,
    color: indexStyles.colorPalette.Primarycolor1,
    fontWeight: indexStyles.typography.fontWeight.medium,
  },
  formContainer: {
    paddingTop: indexStyles.metrics.container.formAdd.paddingTop,
    flex: 1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    marginHorizontal: indexStyles.metrics.container.formAdd.marginHorizontal,
  },
  imgContainer: {
    marginBottom: indexStyles.metrics.container.imageAdd.marginBottom,
  },
  spacer: {
    marginBottom: indexStyles.metrics.misc.spacer.marginBottom,
  },
  scanButton: {
    ...Buttons.main_button,
    borderWidth: indexStyles.metrics.button.scan.borderWidth,
    width: indexStyles.metrics.button.scan.width,
  },
  scanButtonText: {
    ...Buttons.main_buttonText,
  },
  scanLaterButton: {
    ...Buttons.secondary_button,
    borderWidth: indexStyles.metrics.button.scanLater.borderWidth,
    width: indexStyles.metrics.button.scanLater.width,
  },
  scanLaterButtonText: {
    ...Buttons.secondary_buttonText,
  },
});

export default addStyles;
