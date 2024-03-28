import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const productAlertStyles = StyleSheet.create({
  alertContainer: {
    position: "absolute",
    bottom: indexStyles.metrics.container.alert.bottom,
    right: indexStyles.metrics.container.alert.right,
    left: indexStyles.metrics.container.alert.left,
    height: indexStyles.metrics.container.alert.height,
    backgroundColor: indexStyles.colorPalette.Primarycolor1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: indexStyles.metrics.container.alert.zIndex,
  },
  alertText: {
    width: "100%",
    textAlign: "center",
    color: indexStyles.colorPalette.Primarycolor3,
    fontSize: indexStyles.typography.fontSize.body2,
    fontWeight: indexStyles.typography.fontWeight.bold,
  },
});

export default productAlertStyles;
