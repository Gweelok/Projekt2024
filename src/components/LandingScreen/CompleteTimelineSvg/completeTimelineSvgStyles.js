import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const completeTimelineSvgStyles = StyleSheet.create({
  container: {
    // Define styles that were statically applied to the container
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: indexStyles.metrics.container.completeTimelineSvg.marginTop,
    color: indexStyles.colorPalette.Primarycolor1,
  },
  containerCenter: {
    alignItems: "center",
  },
  phone: {
    // Define common phone styles here if any
  },
  phoneLeft: {
    left: indexStyles.metrics.text.leftTimelineSvg.left, // Although it's not text, it shares the same 'left' value
  },
  textLeft: {
    left: indexStyles.metrics.text.leftTimelineSvg.left,
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
  },
  textRight: {
    right: indexStyles.metrics.text.rightTimelineSvg.right,
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
  },
});

export default completeTimelineSvgStyles;
