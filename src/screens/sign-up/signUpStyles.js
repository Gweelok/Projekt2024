import { StyleSheet } from "react-native";
import { styles, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const SignUpStyles = StyleSheet.create({
  text_Tertiary: {
    marginBottom: indexStyles.metrics.text.signUpTertiary.marginBottom,
    color: indexStyles.colorPalette.darkCyan,
    textAlign: "center",
    fontSize: indexStyles.typography.fontSize.body2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.back.width,
    height: indexStyles.metrics.button.back.height,
    justifyContent: "center",
    alignItems: "center",
  },
  errorInputBox: {
    borderColor: indexStyles.colorPalette.errorRed,
    borderWidth: indexStyles.metrics.box.error.borderWidth,
  },
  errorText: {
    color: indexStyles.colorPalette.errorRed,
    fontSize: indexStyles.typography.fontSize.body3,
    marginTop: indexStyles.metrics.text.errorSignInUp.marginTop,
    marginBottom: indexStyles.metrics.text.errorSignInUp.marginBottom,
    textAlign: "center",
    marginLeft: indexStyles.metrics.text.errorSignInUp.marginLeft,
    textAlign: "left",
  },
  helperText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body3,
    marginTop: indexStyles.metrics.text.helperSignUp.marginTop,
    marginBottom: indexStyles.metrics.text.helperSignUp.marginBottom,
    marginLeft: indexStyles.metrics.text.helperSignUp.marginLeft,
    textAlign: "left",
  },
  backButtonContainer: {
    alignSelf: "stretch",
  },
  signUpHeader: {
    ...styles.Header_Primarycolor1,
    ...styles.Header,
  },
  inputField: {
    ...styles.inputBox,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontFamily: indexStyles.typography.fontFamily.primary,
    fontSize: indexStyles.typography.fontSize.body2,
  },
  placeholderColor: {
    color: indexStyles.colorPalette.Primarycolor4,
  },
  eyeIcon: {
    ...styles.Icon_container,
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body7,
  },
  socialButtonText: {
    ...Buttons.SocialMediabuttonText,
  },
  fbButton: {
    ...Buttons.buttonfb,
  },
  googleButton: {
    ...Buttons.buttongoogle,
  },
  submitButton: {
    ...Buttons.main_button,
  },
  submitButtonText: {
    ...Buttons.main_buttonText,
  },
  signInLink: {
    ...styles.link,
  },
});

export default SignUpStyles;
