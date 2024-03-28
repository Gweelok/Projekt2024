import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const completeHousePhoneTextStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: indexStyles.metrics.width.housePhoneText.width,
    alignItems: "center",
  },
  iconArrowRight: {
    color: indexStyles.colorPalette.Primarycolor1,
    size: indexStyles.metrics.icon.housePhoneArrowRight.size,
  },
});

export default completeHousePhoneTextStyles;
