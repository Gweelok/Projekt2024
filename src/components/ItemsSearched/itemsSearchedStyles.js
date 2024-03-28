import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { styles } from "../../styles/Stylesheet";
import { windowWidth } from "../../utils/Dimensions";

const itemsSearchedStyles = StyleSheet.create({
  container: {
    fontFamily: indexStyles.typography.fontFamily.primary,
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "start",
    marginRight: indexStyles.metrics.container.searchedItems.marginRight,
  },
  uptainerText: {
    ...styles.menuItem_text,
  },
  searchedItemText: {
    fontSize: indexStyles.typography.fontSize.body7,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  uptainerName: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body1,
    fontWeight: indexStyles.typography.fontWeight.regular,
  },
  uptainerAddress: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body4,
  },
  image: {
    marginTop: indexStyles.metrics.image.searchedItem.marginTop,
    marginRight: indexStyles.metrics.image.searchedItem.marginRight,
    width: indexStyles.metrics.image.searchedItem.width,
    height: indexStyles.metrics.image.searchedItem.height,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default itemsSearchedStyles;
