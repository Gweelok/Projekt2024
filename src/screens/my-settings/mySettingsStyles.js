import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles, Backgroundstyle } from "../../styles/Stylesheet";

const mySettingsStyle = StyleSheet.create({
  backButton: {
    alignSelf: "stretch",
  },
  header: {
    ...styles.HeaderFull,
  },
  headerText: {
    ...styles.HeaderText,
  },
  settingsOptions: {
    marginTop: indexStyles.metrics.margin.settingsOptions.marginTop,
  },
});

export default mySettingsStyle;
