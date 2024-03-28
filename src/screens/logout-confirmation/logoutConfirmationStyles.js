import { StyleSheet } from "react-native";
import { styles, Backgroundstyle, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles";

const logoutConfirmation = StyleSheet.create({
  confirmMessage: {
    ...styles.article_text,
  },
  logOutButton: {
    ...Buttons.main_button,
    marginTop: indexStyles.metrics.button.logout.marginTop,
    marginBottom: indexStyles.metrics.button.logout.marginBottom,
  },
  logOutButtonText: {
    ...Buttons.main_buttonText,
  },
  cancelButton: {
    ...Buttons.secondary_button,
  },
  cancelButtonText: {
    ...Buttons.secondary_buttonText,
  },
});

export default logoutConfirmation