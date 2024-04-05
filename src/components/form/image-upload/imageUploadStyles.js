import { StyleSheet, Dimensions } from "react-native";
import { styles } from "../../../styles/Stylesheet";
import indexStyles from "../../../styles/index";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const uploadImageStyle = StyleSheet.create({
  UploadImageContainer: {
    padding: indexStyles.metrics.container.uploadImageArea.padding,
    borderWidth: indexStyles.metrics.container.uploadImageArea.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    height: windowHeight / 4.5,
    justifyContent: "center",
    alignContent:"center"
  },
  UploadDescription: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent:"center",
    alignItems: "center",
  },
  imageSize: {
    padding: indexStyles.metrics.image.uploadSize.padding,
    borderWidth: indexStyles.metrics.image.uploadSize.borderWidth,
    borderColor: indexStyles.colorPalette.Primarycolor1,
    height: indexStyles.metrics.image.uploadSize.height,
  },
  cancelIcon: {
    position: "absolute",
    zIndex: indexStyles.metrics.icon.cancel.zIndex,
    opacity: indexStyles.metrics.icon.cancel.opacity,
    backgroundColor: indexStyles.colorPalette.Primarycolor2,
    height: 35,
    width: 35,
    fontSize: 35
  },
  uploadText: {
    marginLeft: indexStyles.metrics.text.upload.marginLeft,
    color: indexStyles.colorPalette.Primarycolor1,
    fontWeight: indexStyles.typography.fontWeight.bold,
    fontSize: indexStyles.typography.fontSize.body1,
    fontFamily: indexStyles.typography.fontFamily.primary,
  },
  galleryBottomText: {
    fontSize: indexStyles.typography.fontSize.body7,
    fontWeight: indexStyles.typography.fontWeight.medium,
    color: indexStyles.colorPalette.black,
    marginLeft: indexStyles.metrics.text.galleryBottom.marginLeft,
    marginTop: indexStyles.metrics.text.galleryBottom.marginTop,
  },
  actionText: {
    fontSize: indexStyles.typography.fontSize.body3,
    fontWeight: indexStyles.typography.fontWeight.medium,
    color: indexStyles.colorPalette.black,
  },
  imageLabel: {
    ...styles.formLabel,
    marginLeft: indexStyles.metrics.label.image.marginLeft,
  },
  optional: {
    ...styles.optionalText,
    marginLeft: indexStyles.metrics.text.optional.marginLeft,
    marginBottom: indexStyles.metrics.text.optional.marginBottom,
  },
  imgIcon: {
    fontSize: indexStyles.typography.fontSize.h2,
    color: indexStyles.colorPalette.Primarycolor4,
  },
  customStyle: {
    wrapper: {
      backgroundColor: indexStyles.colorPalette.darkBlue,
    },
    draggableIcon: {
      backgroundColor: indexStyles.colorPalette.mediumGray,
    },
    container: {
      borderTopLeftRadius:
        indexStyles.metrics.container.uploadImageArea.borderTopLeftRadius,
      borderTopRightRadius:
        indexStyles.metrics.container.uploadImageArea.borderTopRightRadius,
      backgroundColor: indexStyles.colorPalette.Primarycolor3,
    },
  },
  chooseAction: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: indexStyles.metrics.margin.chooseAction.marginTop,
    marginBottom: indexStyles.metrics.margin.chooseAction.marginBottom,
  },
  RBsheetHeight: {
    height: windowHeight / 3.1,
  },
  icon: {
    color: indexStyles.colorPalette.black,
    fontSize: indexStyles.typography.fontSize.h6,
  },
  iconConatiner: {
    alignItems: "center",
  },
  iconSheet: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    padding: indexStyles.metrics.icon.sheet.padding,
  },
});

export default uploadImageStyle;
