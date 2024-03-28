import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index"
import { Buttons, styles} from '../../styles/Stylesheet';

const changePasswordStyles = StyleSheet.create({
  header: {
    ...styles.HeaderFull,
  },
  headerText: {
    ...styles.HeaderText,
  },
  inputContainer: {
    ...styles.container,
  },
  inputText: {
    ...styles.input,
    fontSize: indexStyles.typography.fontSize.body2,
    color: indexStyles.colorPalette.black,
    textAlignVertical: "center",
    flex: 1,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  inputFieldLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.inputField.marginLeft,
  },
  inputbox: {
    ...styles.inputBox,
  },
  errorInputBox: {
    ...styles.errorInputBox,
  },
  errorText: {
    ...styles.errorText,
  },
  placeholderTextColor: {
    color: indexStyles.colorPalette.Primarycolor4, 
  },
  eyeIcon: {
    fontSize: indexStyles.typography.fontSize.body7,
    color: indexStyles.colorPalette.Primarycolor1,
    ...styles.Icon_container,
  },
  saveButton: {
    ...Buttons.main_button,
  },
  saveButtonText: {
    ...Buttons.main_buttonText,
  },
  disabledButton: {
    ...Buttons.disabled_button,
  },
});

export default changePasswordStyles;