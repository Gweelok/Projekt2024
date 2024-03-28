import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles, Backgroundstyle } from "../../../styles/Stylesheet";

const streetStatStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignContent: "center",
    marginTop: indexStyles.metrics.container.statsInfo.marginTop,
  },
  uptainerName: {
    ...styles.paragraph_text,
    fontSize: indexStyles.typography.fontSize.body10,
  },
  uptainerStreet: {
    ...styles.link,
    textAlign: "left",
    marginTop: indexStyles.metrics.text.uptainerAddress.marginTop,
    textDecorationLine: "none",
  },
  messageContainer: {
    flex: 1,
    width: "100%",
  },
  itemsReusedText: {
    ...Backgroundstyle.message_Screens,
    paddingTop: indexStyles.metrics.text.itemsReused.paddingTop,
    height: indexStyles.metrics.text.itemsReused.height,
    marginTop: indexStyles.metrics.text.itemsReused.marginTop,
    paddingLeft: indexStyles.metrics.text.itemsReused.paddingLeft,
    color: indexStyles.colorPalette.Primarycolor3,
  },
  co2SavedText: {
    ...Backgroundstyle.informationScreens,
    paddingTop: indexStyles.metrics.text.co2Saved.paddingTop,
    height: indexStyles.metrics.text.co2Saved.height,
    marginTop: indexStyles.metrics.text.co2Saved.marginTop,
    paddingLeft: indexStyles.metrics.text.co2Saved.paddingLeft,
    color: indexStyles.colorPalette.Primarycolor1,
  },
});

export default streetStatStyles;
