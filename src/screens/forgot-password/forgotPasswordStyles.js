import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles, Buttons, HeaderText } from "../../styles/Stylesheet";

const forgotPasswordStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: indexStyles.metrics.header.forgotPassword.paddingLeft,
  },
  headerText: {
    ...HeaderText.Header,
  },
  description: {
    ...styles.Header_Primarycolor1,
    paddingLeft: indexStyles.metrics.text.descriptionForgotPass.paddingLeft,
    marginTop: indexStyles.metrics.text.descriptionForgotPass.marginTop,
  },
  emailHeader: {
    ...styles.Header_Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    fontSize: indexStyles.typography.fontSize.body1,
    marginBottom: indexStyles.metrics.text.emailHeader.marginBottom,
    paddingLeft: indexStyles.metrics.text.emailHeader.paddingLeft,
  },
  emailInput: {
    ...styles.inputBox,
    marginBottom: indexStyles.metrics.text.emailInput.marginBottom,
    marginTop: indexStyles.metrics.text.emailInput.marginTop,
    fontSize: indexStyles.typography.fontSize.body1,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  sendLinkButton: {
    ...Buttons.main_button,
  },
  sendLinkButtonText: {
    ...Buttons.main_buttonText,
  },
});

export default forgotPasswordStyles;
