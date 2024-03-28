import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { Buttons, styles } from "../../styles/Stylesheet";

const accountSettingsStyle = StyleSheet.create({
  header: {
    ...styles.HeaderFull,
  },
  headerText: {
    ...styles.HeaderText,
  },
  inputBox: {
    ...styles.inputBox,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: indexStyles.metrics.container.icon.marginLeft,
    marginRight: indexStyles.metrics.container.icon.marginRight,
    marginTop: indexStyles.metrics.container.icon.marginTop,
    zIndex: indexStyles.metrics.container.icon.zIndex,
    borderBottomWidth: indexStyles.metrics.container.icon.borderBottomWidth,
    borderBottomColor: indexStyles.colorPalette.pureRed,
  },
  deleteText: {
    color: indexStyles.colorPalette.pureRed,
    textAlign: "center",
    fontFamily: indexStyles.typography.fontFamily.primary,
    marginLeft: indexStyles.metrics.text.delete.marginLeft,
  },
  iconStyle: {
    color: indexStyles.colorPalette.pureRed,
    marginBottom: indexStyles.metrics.icon.accountSettings.marginBottom,
    fontSize: indexStyles.typography.fontSize.body1,
  },
  nameInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: indexStyles.metrics.container.nameInput.marginTop,
  },
  nameLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.profileName.marginLeft,
  },
  nameOptional: {
    ...styles.optionalText,
    marginBottom: indexStyles.metrics.margin.nameOptional.marginBottom,
  },
  errorInputBox: {
      ...styles.errorInputBox,
  },
  errorText: {
    ...styles.errorText,
  },
  placeholderColor: {
    color: indexStyles.colorPalette.primaryColor4,
  },
  emailLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.email.marginLeft,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  phoneLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.phone.marginLeft,
    marginRight: indexStyles.metrics.label.phone.marginRight,
  },
  phoneOptional: {
    ...styles.optionalText,
    marginLeft: indexStyles.metrics.margin.phoneOptional.marginLeft,
    marginBottom: indexStyles.metrics.margin.phoneOptional.marginBottom,
  },
  submitButton: {
    ...Buttons.main_button,
    marginTop: indexStyles.metrics.button.submit.marginTop,
  },
  submitButtonText: {
    ...Buttons.main_buttonText,
  },
  disableButton: {
    ...Buttons.disabled_button,
  },
  divider: {
    ...styles.divider,
  },
  changeCodeText: {
    marginBottom: indexStyles.metrics.text.changeCode.marginBottom,
  },
  languageSelectorContainer: {
    alignItems: "center",
    flex: 1,
    zIndex: indexStyles.metrics.container.languageSelector.zIndex,
  },
  languageText: {
    ...styles.menuItem_text,
    marginLeft: indexStyles.metrics.text.language.marginLeft,
    marginBottom: indexStyles.metrics.text.language.marginBottom,
  },
  deleteContainer: {
    marginTop: indexStyles.metrics.container.delete.marginTop,
  },
});

export default accountSettingsStyle;