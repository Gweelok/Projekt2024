import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";
import { styles, Buttons, Backgroundstyle } from "../../../styles/Stylesheet";

const visitedUptainerStatStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  boxLinkContainer: {
    ...styles.boxlink,
  },
  bodyWrapper: {
    flex: 1,
    width: "100%",
  },
  menuItemText: {
    ...styles.menuItem_text,
  },
  uptainerStreet: {
    ...styles.menuItem_text,
    fontFamily: indexStyles.typography.fontFamily.primary,
    fontSize: indexStyles.typography.fontSize.body2,
  },
  iconContainer: {
    ...styles.Icon_container,
  },
  menuItemArrow: {
    ...styles.menuItem_arrow,
    fontSize: indexStyles.metrics.icon.arrowRight.size,
  },
  itemsReusedText: {
    ...Backgroundstyle.message_Screens,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    paddingTop: indexStyles.metrics.text.itemsReused.paddingTop,
    height: indexStyles.metrics.text.itemsReused.height,
    width: indexStyles.metrics.text.itemsReused.width,
    paddingLeft: indexStyles.metrics.text.co2Saved.paddingLeft,
    color: indexStyles.colorPalette.Primarycolor3,
  },
  co2SavedText: {
    ...Backgroundstyle.informationScreens,
    paddingTop: indexStyles.metrics.text.co2Saved.paddingTop,
    height: indexStyles.metrics.text.co2Saved.height,
    marginTop: indexStyles.metrics.text.co2Saved.marginTop,
    marginBottom: indexStyles.metrics.text.co2Saved.marginBottom,
    paddingLeft: indexStyles.metrics.text.co2Saved.paddingLeft,
    width: indexStyles.metrics.text.co2Saved.width,
    color: indexStyles.colorPalette.Primarycolor1,
  },
});

export default visitedUptainerStatStyles;
