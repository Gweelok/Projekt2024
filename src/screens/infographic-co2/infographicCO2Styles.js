import { StyleSheet } from "react-native";
import { styles } from "../../styles/Stylesheet";
import indexStyles from "../../styles/index";

const infoGraphicC02Style = StyleSheet.create({
  svgContainer: {
    width: indexStyles.metrics.container.svgInfographic.width,
    alignItems: "center",
    marginTop: indexStyles.metrics.container.svgInfographic.marginTop,
  },
  closeContainer: {
    position: "absolute",
    zIndex: indexStyles.metrics.container.closeIcon.zIndex,
    right: indexStyles.metrics.container.closeIcon.right,
    marginTop: indexStyles.metrics.container.closeIcon.marginTop,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
  },
  closeButton: {
    ...styles.closeButton
  },
  closeIcon: {
    ...styles.closeButtonIcon,
    fontSize: indexStyles.typography.fontSize.h2,
  },
  messageTextContainer: {
    justifyContent: "center",
    marginTop: indexStyles.metrics.container.textInfographic.marginTop,
    marginBottom: indexStyles.metrics.container.textInfographic.marginBottom,
  },
  messageText: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontSize: indexStyles.typography.fontSize.body6,
    textAlign: "center",
    fontFamily: indexStyles.typography.fontFamily.primary,
  }
});

export default infoGraphicC02Style;
