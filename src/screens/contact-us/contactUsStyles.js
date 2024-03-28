import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles, Buttons } from "../../styles/Stylesheet";

const contactUsStyles = StyleSheet.create({
  TextOnTheTop: {
    ...styles.paragraph_text,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: indexStyles.metrics.header.contactUs.marginBottom,
  },
  headerText: {
    ...styles.HeaderText,
  },

  formLabel: {
    ...styles.menuItem_text,
    marginLeft: indexStyles.metrics.label.formContactUs.marginLeft,
    marginBottom: indexStyles.metrics.label.formContactUs.marginBottom,
    marginTop: indexStyles.metrics.label.formContactUs.marginTop,
    fontSize: indexStyles.typography.fontSize.body2,
  },
  inputField: {
    ...styles.inputBox,
    marginBottom: 0,
  },
  messageInputField: {
    ...styles.inputBox,
    minHeight: indexStyles.metrics.box.messageInputField.minHeight,
  },
  sendButton: {
    ...Buttons.main_button,
    marginTop: indexStyles.metrics.button.send.marginTop,
  },
  sendButtonText: {
    ...Buttons.main_buttonText,
  },
  placeholderTextColor: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
});

export default contactUsStyles;