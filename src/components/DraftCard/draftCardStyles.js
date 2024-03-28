import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";
import { Buttons } from "../../styles/Stylesheet";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const draftCardStyles = StyleSheet.create({
  container: {
    width: indexStyles.metrics.container.draftCardList.width,
  },
  draftBox: {
    width: indexStyles.metrics.box.draftCard.width,
    height: windowHeight / 3,
    marginBottom: indexStyles.metrics.box.draftCard.marginBottom,
    borderWidth: indexStyles.metrics.box.draftCard.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    flexDirection: "row",
  },
  draftBoxOpacity: {
    opacity: indexStyles.metrics.box.draftCard.opacity,
  },
  draftContent: {
    alignContent: "center",
    alignSelf: "center",
    padding: indexStyles.metrics.container.draftContent.padding,
    width: windowWidth / 2.4,
  },
  draftImage: {
    width: windowWidth / 2.4,
    height: windowHeight / 3.06,
  },
  scanButton: {
    ...Buttons.main_button,
    borderWidth: indexStyles.metrics.button.draftScan.borderWidth,
    marginLeft: indexStyles.metrics.button.draftScan.marginLeft,
    width: indexStyles.metrics.button.draftScan.width,
    marginBottom: indexStyles.metrics.button.draftScan.marginBottom,
  },
  product: {
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.h4,
    color: indexStyles.colorPalette.Primarycolor1,
    marginBottom: indexStyles.metrics.text.descriptionDraftCard.marginBottom,
  },
  category: {
    fontWeight: indexStyles.typography.fontWeight.medium,
    fontSize: indexStyles.typography.fontSize.body1,
    color: indexStyles.colorPalette.Primarycolor1,
    marginBottom: indexStyles.metrics.text.descriptionDraftCard.marginBottom,
  },
  brand: {
    fontWeight: indexStyles.typography.fontWeight.medium,
    fontSize: indexStyles.typography.fontSize.body9,
    color: indexStyles.colorPalette.Primarycolor1,
    marginBottom: indexStyles.metrics.text.descriptionDraftCard.marginBottom,
  },
  model: {
    fontWeight: indexStyles.typography.fontWeight.medium,
    fontSize: indexStyles.typography.fontSize.body9,
    color: indexStyles.colorPalette.Primarycolor1,
    marginBottom: indexStyles.metrics.text.descriptionDraftCard.marginBottom,
    marginLeft: indexStyles.metrics.text.descriptionDraftCard.marginLeft,
  },
  brandModelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: windowWidth / 2.4,
  },
  descriptionItemCondition: {
    fontSize: indexStyles.typography.fontSize.body3,
    color: indexStyles.colorPalette.Primarycolor1,
    marginBottom: indexStyles.metrics.text.descriptionDraftCard.marginBottom,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
  description: {
    fontSize: indexStyles.typography.fontSize.body3,
    color: indexStyles.colorPalette.Primarycolor1,
    fontStyle: "italic",
  },
  deleteIcon: {
    color: indexStyles.colorPalette.Primarycolor3,
    size: indexStyles.metrics.icon.deleteDraft.size,
  },
  deleteIconContainer: {
    position: "absolute",
    zIndex: indexStyles.metrics.container.deleteDraftIcon.zIndex,
    right: indexStyles.metrics.container.deleteDraftIcon.right,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
});

export default draftCardStyles;
