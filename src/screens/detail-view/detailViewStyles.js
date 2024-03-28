import { StyleSheet } from "react-native";
import { styles, Buttons } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const detailViewStyles = StyleSheet.create({
  image: {
    height: indexStyles.metrics.image.detailView.height,
    width: indexStyles.metrics.image.detailView.width,
    marginTop: indexStyles.metrics.image.detailView.marginTop,
  },

  text: {
    paddingTop: indexStyles.metrics.text.detailView.paddingTop,
    height: indexStyles.metrics.text.detailView.height,
    borderRadius: indexStyles.metrics.text.detailView.borderRadius,
    marginTop: indexStyles.metrics.text.detailView.marginTop,
    marginRight: indexStyles.metrics.text.detailView.marginRight,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  takeButton: {
    ...Buttons.main_button,
    marginTop: indexStyles.metrics.button.take.marginTop,
  },
  takeButtonText: {
    ...Buttons.main_buttonText,
  },
  product: {
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.h4,
    marginBottom: indexStyles.metrics.margin.detailViewProduct.marginBottom,
    color: indexStyles.colorPalette.Primarycolor1,
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: indexStyles.metrics.container.infoDetailView.marginTop,
    marginBottom: indexStyles.metrics.container.infoDetailView.marginBottom,
  },

  leftInfo: {
    alignItems: "flex-start",
    width: indexStyles.metrics.width.detailViewInfo.width,
  },

  rightInfo: {
    width: indexStyles.metrics.width.detailViewInfo.width,
  },
  location: {
    color: indexStyles.colorPalette.Primarycolor1,
    textDecorationLine: "underline",
    marginTop: indexStyles.metrics.margin.detailViewLocation.marginTop,
    fontSize: indexStyles.typography.fontSize.body5,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: indexStyles.metrics.container.infoDetailView.marginTop,
  },
  detailDivider: {
    width: indexStyles.metrics.misc.detailDivider.width,
  },
  locationIcon: {
    fontSize: indexStyles.typography.fontSize.body2,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  productTakenLink: {
    ...styles.link,
    marginTop: indexStyles.metrics.link.productTaken.marginTop,
  },
  backButton: {
    ...Buttons.backButton,
  },
});

export default detailViewStyles;
