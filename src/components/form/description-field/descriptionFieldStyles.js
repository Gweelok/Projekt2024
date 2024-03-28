import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles } from "../../../styles/Stylesheet";

const descriptionFieldStyles = StyleSheet.create({
  dscLabel: {
    fontFamily: indexStyles.typography.fontFamily.primaryMedium,
    fontSize: indexStyles.typography.fontSize.body1,
    fontWeight: indexStyles.typography.fontWeight.bold,
    marginBottom: indexStyles.metrics.label.description.marginBottom,
    marginRight: indexStyles.metrics.label.description.marginRight,
  },
  dscInput: {
    alignItems: "center",
    height: indexStyles.metrics.text.descriptionInput.height,
    fontFamily: indexStyles.typography.fontFamily.primary,
    borderWidth: indexStyles.metrics.text.descriptionInput.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    backgroundColor: indexStyles.colorPalette.Primarycolor3,
    padding: indexStyles.metrics.text.descriptionInput.padding,
    fontSize: indexStyles.typography.fontSize.body1,
    textAlignVertical:"top"
  },
  optionalText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body3,
    fontWeight: indexStyles.typography.fontWeight.regular,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  formLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.description.marginLeft,
    marginTop: indexStyles.metrics.label.description.marginTop,
  },
  placeholdercolor: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
});

export default descriptionFieldStyles;