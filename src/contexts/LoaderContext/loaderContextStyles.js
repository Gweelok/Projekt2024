import { StyleSheet } from "react-native";
import indexStyles from "../../styles/index";

const loaderContextStyles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: indexStyles.colorPalette.transparentBlack,
  },
  activityIndicator: {
    color: indexStyles.Primarycolor1,
    size: "large",
  },
});

export default loaderContextStyles;
