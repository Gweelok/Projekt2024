import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const housePhoneTextStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: indexStyles.colorPalette.Primarycolor1,
    fontFamily: indexStyles.typography.fontFamily.primaryBold,
    marginTop: indexStyles.metrics.text.phone.marginTop,
  },
  phone: {
    position: "absolute",
    top: indexStyles.metrics.svg.phone.top,
    right: indexStyles.metrics.svg.phone.right,
  },
});

export default housePhoneTextStyles;
