import { StyleSheet } from "react-native";
import { styles } from "../../styles/Stylesheet";
import indexStyles from "../../styles";

const boxlinkStyles = StyleSheet.create({
  boxLinkContainer: {
    ...styles.boxlink,
  },
  wrapper: {
    ...indexStyles.metrics.screen.wrapper,
  },
  menuItem_text: {
    ...styles.menuItem_text,
  },
  iconContainer: {
    ...styles.Icon_container,
  },
  arrowIcon: {
    ...styles.menuItem_arrow,
    fontSize: 30,
  },
});

export default boxlinkStyles;
