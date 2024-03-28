import { StyleSheet, Dimensions } from "react-native";
import indexStyles from "../../styles/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const uptainerDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    width: indexStyles.metrics.button.back.width,
    height: indexStyles.metrics.button.back.height,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: indexStyles.metrics.button.back.marginBottom,
  },
  detailsImage: {
    width: windowWidth / 1.1,
    height: windowHeight / 3,
  },
  productLocation: {
    // Name should be updated to uptainerLocation
    width: windowWidth / 1.7,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    height: indexStyles.metrics.container.uptainerLocation.height,
    position: "absolute",
    bottom: indexStyles.metrics.container.uptainerLocation.bottom,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productAddress: {
    // Name should be updated to uptainerAddress
    width: indexStyles.metrics.text.uptainerAddress.width,
    fontSize: indexStyles.typography.fontSize.body1,
    color: indexStyles.colorPalette.Primarycolor3,
    fontWeight: indexStyles.typography.fontWeight.bold,
    padding: indexStyles.metrics.text.uptainerAddress.padding,
  },
  moreProductsImage: {
    width: windowWidth / 2.7,
    height: windowHeight / 6.4,
  },
  newItemStyle: {
    // Is it used?
    position: "absolute",
    height: indexStyles.metrics.item.new.height,
    width: indexStyles.metrics.item.new.width,
    opacity: indexStyles.metrics.item.new.opacity,
    backgroundColor: indexStyles.colorPalette.Primarycolor4,
    zIndex: indexStyles.metrics.item.new.zIndex,
    elevation: indexStyles.metrics.item.new.elevation,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical:
      indexStyles.metrics.container.scrollViewContent.paddingVertical,
    marginTop: indexStyles.metrics.container.scrollViewContent.marginTop,
  },
  item: {
    width: indexStyles.metrics.item.uptainerDetails.width, // Adjust the width as per your requirement
    aspectRatio: indexStyles.metrics.item.uptainerDetails.aspectRatio,
    margin: indexStyles.metrics.item.uptainerDetails.margin,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    width: indexStyles.metrics.container.full.width,
    height: indexStyles.metrics.container.full.height, // Adjust the height as per your requirement
  },
  image: {
    width: indexStyles.metrics.image.full.width,
    height: indexStyles.metrics.image.full.height,
    resizeMode: "cover",
  },
  productNameText: {
    flexDirection: "row",
    marginTop: indexStyles.metrics.text.productName.marginTop,
    marginBottom: indexStyles.metrics.text.productName.marginBottom,
    width: indexStyles.metrics.text.productName.width,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body2,
  },
  forwardIcon: {
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.h2,
  },
  backwardIcon: {
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.h4,
  },
  activityIndicator:{
    color: indexStyles.colorPalette.Primarycolor1
  },
});

export default uptainerDetailsStyle;
