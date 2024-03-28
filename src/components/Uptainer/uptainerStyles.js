import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const uptainerStyles = StyleSheet.create({
  container: {
    marginVertical: indexStyles.metrics.container.uptainer.marginVertical,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streetText: {
    fontSize: indexStyles.typography.fontSize.body7,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  distance: {
    fontSize: indexStyles.typography.fontSize.body5,
    color: indexStyles.colorPalette.Primarycolor1,
    marginTop: indexStyles.metrics.text.distance.marginTop,
  },
  item: {
    width: indexStyles.metrics.item.uptainer.width, // Set the width of each item
    height: indexStyles.metrics.item.uptainer.height,
    margin: indexStyles.metrics.item.uptainer.margin,
    overflow: "hidden",
  },
  image: {
    width: indexStyles.metrics.image.full.width, // Set the width of each item
    height: indexStyles.metrics.image.full.height,
    resizeMode: "cover",
  },
  flatList: {
    marginBottom: indexStyles.metrics.list.flat.marginBottom,
    marginTop: indexStyles.metrics.list.flat.marginTop,
  },
  activityIndicator: {
    color: indexStyles.colorPalette.Primarycolor1,
  },
});

export default uptainerStyles;
