import { StyleSheet } from "react-native";
import { styles, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const termsAndCondStyles = StyleSheet.create({
  header: {
    ...styles.Header,
    ...styles.Header_Primarycolor1,
    fontSize: indexStyles.typography.fontSize.h5,
    textAlign: "center",
  },
  renderTerm: {
    ...styles.paragraph_text,
  },
  termList: {
    marginVertical: indexStyles.metrics.list.termsConditions.marginVertical,
    paddingHorizontal:
      indexStyles.metrics.list.termsConditions.paddingHorizontal,
  },
  acceptButton: {
    ...Buttons.main_button,
    marginBottom: indexStyles.metrics.button.accept.marginBottom,
  },
  acceptButtonText: {
    ...Buttons.main_buttonText,
  },
  backButton: {
    ...Buttons.secondary_button,
    marginBottom: indexStyles.metrics.button.backTermsConditions.marginBottom,
  },
  backButtonText: {
    ...Buttons.secondary_buttonText,
  },
});

export default termsAndCondStyles;
