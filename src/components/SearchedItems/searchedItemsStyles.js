import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const searchedItemsStyles = StyleSheet.create({
  container: {
    height: windowHeight - 121,
    width: windowWidth,
  },
  loadingContainer: {
    flex: 1,
    marginRight: indexStyles.metrics.container.loading.marginRight,
    justifyContent: "center",
  },
  scrollView: {
    width: windowWidth * 0.89,
  },
  productsMatch: {
    color: indexStyles.colorPalette.Primarycolor1, // Assuming your colors are structured this way
    fontSize: indexStyles.typography.fontSize.body2,
    marginTop: indexStyles.metrics.text.productsMatch.marginTop,
    marginBottom: indexStyles.metrics.text.productsMatch.marginBottom,
  },
});

export default searchedItemsStyles;
