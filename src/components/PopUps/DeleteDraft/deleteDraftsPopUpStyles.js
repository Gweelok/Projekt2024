import { StyleSheet } from "react-native";
import indexStyles from "../../../styles/index";

const deleteDraftsPopUpStyles = StyleSheet.create({
  customButtonStyle: {
    backgroundColor: indexStyles.colorPalette.errorRed,
    borderRadius: indexStyles.metrics.button.deleteDraft.borderRadius,
    borderColor: indexStyles.colorPalette.errorRed,
    alignItems: "center",
  },
});

export default deleteDraftsPopUpStyles;
